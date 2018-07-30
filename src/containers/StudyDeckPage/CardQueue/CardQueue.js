import { SimpleQueue } from './SimpleQueue'; 
import { PriorityQueue } from './PriorityQueue';

export const QUEUE_STRATEGY = {
    SIMPLE: 'SIMPLE',
    PRIORITY: 'PRIORITY'
}

export class CardQueue {
    constructor(cards = [], strategy = QUEUE_STRATEGY.SIMPLE) {
        if(strategy === QUEUE_STRATEGY.SIMPLE) {
            this.queue = new SimpleQueue(cards); 
        }
        else if(strategy === QUEUE_STRATEGY.PRIORITY) {
            this.queue = new PriorityQueue(cards); 
        }
    }
    
    getQueue() {
        return this.queue.getQueue(); 
    }

    // remove and return top element of queue
    poll() {
        return this.queue.poll(); 
    }

    // return (without removing) top element of queue
    peek() {
        return this.queue.peek(); 
    }

    insert(card) {
        return this.queue.insert(card); 
    }
}