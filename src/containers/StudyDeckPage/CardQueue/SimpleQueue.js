export class SimpleQueue {
    constructor(cards) {
        this.queue = [...cards];
    }
    
    getQueue() {
        return this.queue; 
    }

    // remove and return top element of queue
    poll() {
        const top = this.queue.shift(); 
        return top; 
    }

    // return (without removing) top element of queue
    peek() {
        if(this.queue.length) return this.queue[0]; 
        else return null; 
    }

    insert(card) {
        this.queue.push(card); 
    }
}