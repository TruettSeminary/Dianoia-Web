import PriorityQueueJS from 'js-priority-queue'; 

const compareCards = function(cardA, cardB) {
    return cardA.note.card_score - cardB.note.card_score; 
}

export class PriorityQueue {
    constructor(cards) {
        this.queue = new PriorityQueueJS({
            comparator: compareCards, 
            initialValues: cards, 
            strategy: PriorityQueueJS.BinaryHeapStrategy
        })
    }

    getQueue() {
        return this.queue.priv.data; 
    }

    poll() {
        return this.queue.dequeue(); 
    }

    peek() {
        return this.queue.peek(); 
    }

    insert(card) {
        this.queue.queue(card); 
    }

}