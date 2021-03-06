
export class EngineGame{
    constructor(time_step, update, render) {
        this.accumulated_time        = 0;
        this.time                    = undefined;
        this.time_step               = time_step;
        this.updated = false;
        this.update = update;
        this.render = render;
        this.handleRun = (time_step) => { this.run(time_step); };
    }

    run(time_stamp){
        this.accumulated_time += time_stamp - this.time;
        this.time = time_stamp;

        while(this.accumulated_time >= this.time_step) {

            this.accumulated_time -= this.time_step;

            this.update(time_stamp);

            this.updated = true;
        }

        if (this.updated) {

            this.updated = false;
            this.render(time_stamp);

        }

        window.requestAnimationFrame(this.handleRun);
    }

    start(){
        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        window.requestAnimationFrame(this.run(this.time_step));
    }
}




























































