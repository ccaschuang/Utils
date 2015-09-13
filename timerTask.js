//How to use
//  do the task immediately
//	execTask.cycleTick = 0;
//
// init the task
// execTask.check(); 


//Define the task
execTask = {
	cycleTime : 3, //refresh time
	cycleTick : 1, // delay a time, need to wait queryHsInfoPendingDataTask to do first.
	prevHorseCount: 0,
	execute : function() {
		var that = this;
    try{
      //Implement what you want to do here...
    }catch(e){
					Trace.printStackTrace(e);
	  } finally {
			that.check();
			TaskExecuter.execute();
		}

	},
	check : function() {
		var that = this;
		if (this.cycleTick <= 0) {
			this.cycleTick = this.cycleTime;
			TaskExecuter.addTask(this);
		} else {
			if (this.cycleTick > 0) {
				this.cycleTick--;
			}
			setTimeout(function() { that.check(); }, 1000);
		}
	}
};
