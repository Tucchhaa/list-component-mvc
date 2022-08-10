interface IDictionary<TValue> {
    [id: string]: TValue;
}

export class EventEmitter {
    events: IDictionary<CallableFunction[]>;
    
    constructor() {
        this.events = {};
    }
    
    public on(event: string, listener: CallableFunction): EventEmitter {
        if(!this.events[event])
            this.events[event] = [];

        this.events[event].push(listener);

        return this;
    }

    public onMany(events: string[], listener: CallableFunction): EventEmitter {
        for(const event of events) {

            if(!this.events[event])
                this.events[event] = [];

            this.events[event].push(listener);
            
        }

        return this;
    }

    protected emit(event: string, param?: object) {
        for(const listener of (this.events[event] || [])) {
            listener(param);
        }
    }
}