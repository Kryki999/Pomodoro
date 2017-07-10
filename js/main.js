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
			breakTimeStandard = 60;
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
	var statusPom;
	
	$('#start').click(async function(){
		if(on == false && stoped == false)
		{	
			console.log('startowanie');
			play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
			$('#start').css('background', '#E1B16A');
			on = true;	
			seconds = 0; minutes = 0; visibleMin = 0; visibleSec = 0;
			
			for(var i=0;i<5;i++){
				if(stoped == false){
				seconds = 0; minutes = 0; visibleMin; visibleSec;
				status.innerHTML = 'WORK';
				$('#status').css('background', '#78A5A3');
				while(minutes < workTimeStandard && stoped == false){
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
					
				while(minutes < workTimeStandard && stoped == false);
				}
				if(stoped == false){
				seconds = 0; minutes = 0; visibleMin; visibleSec;
				status.innerHTML = 'BREAK';
				$('#status').css('background', '#763626');
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
				play.innerHTML = '<i class="fa fa-play" aria-hidden="true">';
				$('#start').css('background', '#80BD9E');
				statusPom = status.innerHTML;
				$('#status').css('background', '#E1B16A');
				status.innerHTML = 'PAUSED';
				stoped = true;
				on = false;
						
			}
		
		
		else if(on == false && stoped == true)
			{
				console.log('wznawianie');
				stoped = false;
				on = true;
				play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
				$('#start').css('background', '#E1B16A');

				
				
				if(statusPom == 'WORK' && stoped == false){status.innerHTML = 'WORK';
				$('#status').css('background', '#78A5A3');}
				if(statusPom == 'WORK')
					{
						if(minutes == breakTimeStandard){seconds = 0; minutes = 0; visibleMin = 0; visibleSec = 0;}
						while(minutes < workTimeStandard && stoped == false)
							{	
								await sleep(1000);
								if(stoped == false){
									seconds++;
									visibleMin = minutes;
									visibleSec = seconds;
									if(seconds == 60){minutes++; seconds=0}
									if(seconds < 10){visibleSec = '0' + seconds}
									if(minutes < 10){visibleMin = '0' + minutes}

									timer.innerHTML = visibleMin + ':' + visibleSec;	 
									console.log('WORK: '+seconds);
								}
							}
						if(minutes == workTimeStandard)statusPom = 'BREAK';
					}
					
					if(statusPom == 'BREAK' && stoped == false){status.innerHTML = 'BREAK';
					$('#status').css('background', '#763626');}
					
					if(statusPom == 'BREAK')
					{
						if(minutes == workTimeStandard){seconds = 0; minutes = 0; visibleMin = 0; visibleSec = 0;}
					
						while(minutes < breakTimeStandard && stoped == false)
							{
								await sleep(1000);
								if(stoped == false){
								seconds++;
								visibleMin = minutes;
								visibleSec = seconds;
								if(seconds == 60){minutes++; seconds=0}
								if(seconds < 10){visibleSec = '0' + seconds}
								if(minutes < 10){visibleMin = '0' + minutes}

								timer.innerHTML = visibleMin + ':' + visibleSec;
								console.log('BREAK: '+seconds);
							}
							}
						if(minutes == breakTimeStandard){statusPom = 'WORK';}
					}
				} 
	});
	
	$('#stop').click(function(){
				timer.innerHTML = '00:00';
				$('#status').css('background', '#ce5a57');
				status.innerHTML = 'STOPED';
				stoped = false;
				on = false;
				play.innerHTML = '<i class="fa fa-play" aria-hidden="true">';
				$('#start').css('background', '#80BD9E');
	});
});