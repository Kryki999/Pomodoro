$(document).ready(function(){	
	//Zmienne Opcji Timera
	var workTime = document.getElementById('workTime');
	var workPlus = document.getElementById('workPlus');
	var workMinus = document.getElementById('workMinus');
	var workTimeStandard = 25;
	
	var breakTime = document.getElementById('breakTime');
	var breakPlus = document.getElementById('breakPlus');
	var breakMinus = document.getElementById('breakMinus');
	var breakTimeStandard = 5;
	var menuOpen = false;
	$('#set').click(function(){
		if(menuOpen == false){
		$('#menu').css('visibility', 'visible');
		menuOpen = true;}
		else{$('#menu').css('visibility', 'hidden');
		menuOpen = false;}
	});
	
	
	$('#workMinus').click(function(){
		workTimeStandard-=1;
		if(workTimeStandard < 1)
				workTimeStandard = 60;
		workTime.innerHTML = workTimeStandard;
		
	});
		$('#workPlus').click(function(){
		workTimeStandard+=1;
		if(workTimeStandard > 60)
				workTimeStandard = 1;
		workTime.innerHTML = workTimeStandard;
	});
		$('#breakMinus').click(function(){
		breakTimeStandard-=1;
		if(breakTimeStandard < 1)
			breakTimeStandard = 60
		breakTime.innerHTML = breakTimeStandard;
	});
		$('#breakPlus').click(function(){
		breakTimeStandard+=1;
		if(breakTimeStandard > 60)
			breakTimeStandard = 1;
		breakTime.innerHTML = breakTimeStandard;
	});
	
	
	function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
	
	//Zmienne Timera
	var timer = document.getElementById('time');
	var stop = document.getElementById('stop');
	var play = document.getElementById('start');
	var status = document.getElementById('status');
	var set = document.getElementById('set');
	var on = false;
	var stoped = false;
	var statusString = 'WORK';
	var seconds = 0, minutes = 0, visibleMin, visibleSec;
	
	$('#start').click(async function(){
		
		if(on == false && stoped == false)
		{	
			console.log('startowanie');
			on = true;	
	
			
			for(var i=0;i<5;i++){
				if(stoped == false){
				seconds = 0; minutes = 0; visibleMin; visibleSec;
				status.innerHTML = 'WORK';
				while(minutes < workTimeStandard && stoped == false)
					{
				await sleep(1000);
				if(stoped == false){
				seconds++;
				visibleMin = minutes;
				visibleSec = seconds;
				if(seconds == 59){minutes++; seconds=0}
				if(seconds < 10){visibleSec = '0' + seconds}
				if(minutes < 10){visibleMin = '0' + minutes}

				timer.innerHTML = visibleMin + ':' + visibleSec;
					}
				}
				}
				if(stoped == false){
				seconds = 0; minutes = 0; visibleMin; visibleSec;
				status.innerHTML = 'BREAK';
				while(minutes < breakTimeStandard && stoped == false)
					{
				await sleep(1000);
				if(stoped == false){
				seconds++;
				visibleMin = minutes;
				visibleSec = seconds;
				if(seconds == 59){minutes++; seconds=0}
				if(seconds < 10){visibleSec = '0' + seconds}
				if(minutes < 10){visibleMin = '0' + minutes}

				timer.innerHTML = visibleMin + ':' + visibleSec;
				}
					}
				}
			}
		}
		
		else if(on == true && stoped == false)
			{
				console.log('stopowanie');
				stoped = true;
				on = false;
			}
		
		
		
		
		else if(on == false && stoped == true)
			{
				
				console.log('wznawianie');
				stoped = false;
				on = true;
				
				for(var i=0;i<100;i++){
				if(status.innerHTML == 'WORK')
					{
						while(minutes < workTimeStandard && stoped == false)
							{	
								await sleep(1000);
								if(stoped == false){
									seconds++;
									visibleMin = minutes;
									visibleSec = seconds;
									if(seconds == 59){minutes++; seconds=0}
									if(seconds < 10){visibleSec = '0' + seconds}
									if(minutes < 10){visibleMin = '0' + minutes}

									timer.innerHTML = visibleMin + ':' + visibleSec;	 
								}
							}
						if(minutes >= workTimeStandard) status.innerHTML = 'BREAK';
					}
					else
					{
						while(minutes < breakTimeStandard && stoped == false)
							{
								await sleep(1000);
								if(stoped == false){
								seconds++;
								visibleMin = minutes;
								visibleSec = seconds;
								if(seconds == 59){minutes++; seconds=0}
								if(seconds < 10){visibleSec = '0' + seconds}
								if(minutes < 10){visibleMin = '0' + minutes}

								timer.innerHTML = visibleMin + ':' + visibleSec;
							}
							}
						if(minutes >= breakTimeStandard) status.innerHTML = 'WORK';
					}
			}
			}
			
	});
});