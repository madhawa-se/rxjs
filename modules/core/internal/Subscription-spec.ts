import { Subscription, SubsCmd } from './Subscription';
import { expect } from 'chai';

describe('Subscription', () => {
  it('should be an instanceof Subscription', () => {
    const s = new Subscription();
    expect(s).to.be.an.instanceof(Subscription);
  });

  it('should take a teardown function', () => {
    let fired = false;
    const s = new Subscription(() => fired = true);
    expect(fired).to.be.false;
    s.unsubscribe();
    expect(fired).to.be.true;
  });
  it('should add children, and unsub in order', () => {
    const results: number[] = [];
    let i = 0;
    const s = new Subscription(() => results.push(i++));
    s.add(() => results.push(i++));
    s.add(() => results.push(i++));
    s.add(new Subscription(() => results.push(i++)));
    s.add(() => results.push(i++));

    expect(results).to.deep.equal([]);
    s.unsubscribe();
    expect(results).to.deep.equal([0, 1, 2, 3, 4])
  });
});
