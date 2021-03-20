document.addEventListener("DOMContentLoaded", handleDocumentLoad); //when HTML doc. is fully loaded, call "handleDocumentLoad" function
function handleDocumentLoad() //'handleDocumentLoad' function is comprised of all the following functions
{
	//Play & Pause Button
	var mmuVideo = document.querySelector ("video"); //defines the "video" in the HTML document as the variable "mmuVideo"
	var playButton = document.getElementById ("playPause"); //defines the "playPause" button in the HTML document as the variable "playButton"
	playButton.addEventListener("click", playPauseVideo); //when "playButton" button is clicked, call "playPauseVideo" function
	function playPauseVideo() //'playPauseVideo' function plays or pauses the video
	{
		if (mmuVideo.paused == true) //if video is paused...
		{
			mmuVideo.play(); //play video when "playButton" button is clicked
			playButton.innerHTML = "Pause"; //write "Pause" in "playButton" button
		}
		else
		{
			mmuVideo.pause(); //pause video when "playButton" button is clicked
			playButton.innerHTML = "Play"; //write "Play" in "playButton" button
		}
	}
	
	//Stop Button
	var stopButton = document.getElementById ("stop"); //defines the "stop" button in the HTML document as the variable "stopButton"
	stopButton.addEventListener("click", stopVideo); //when "stopButton" button is clicked, call "stopVideo" function
	function stopVideo() //'stopVideo' function stops the video
	{
		mmuVideo.pause(); //pause video when "stopButton" button is clicked
		mmuVideo.currentTime = 0; //sets video's time to "0"/"00:00"
		playButton.innerHTML = "Play"; //write "Play" in "playButton" button
		mmuVideo.playbackRate = 1; //video's playbackRate = 1
		fastForwardButton.innerHTML = ">"; //write ">" in "fastForwardButton" button
		playbackSpeed.value = mmuVideo.playbackRate; //drop-down menu's displayed value corresponds to the video's playback rate
	}
	
	//Mute & Unmute Button
	var muteButton = document.getElementById ("muteUnmute"); //defines the "muteUnmute" button in the HTML document as the variable "muteButton"
	muteButton.addEventListener("click", muteUnmuteVideo); //when "muteButton" button is clicked, call "muteUnmuteVideo" function
	function muteUnmuteVideo() //'muteUnmuteVideo' function mutes or unmutes the video
	{
		if (mmuVideo.muted == false) //if the video is not muted...
		{
			mmuVideo.muted = true; //mute video when "muteButton" button is clicked
			muteButton.innerHTML = "Unmute"; //write "Unmute" in "muteButton" button
		}
		else
		{
			mmuVideo.muted = false; //unmute video when "muteButton" button is clicked
			muteButton.innerHTML = "Mute"; //write "Mute" in "muteButton" button
		}
	}
	
	//Seek Bar
	var scrubPlaySlider = document.getElementById ("seekBar"); //defines the "seekBar" input in the HTML document as the variable "scrubPlaySlider"
	scrubPlaySlider.addEventListener("input", scrubVideo); //when "scrubPlaySlider" is in use, call "scrubVideo" function
	function scrubVideo() //'scrubVideo' function allows the user to scrub through the video
	{
		var scrubTime = mmuVideo.duration * (scrubPlaySlider.value / 100); //the "scrubPlaySlider" value/position is converted to a percentage of the video's duration to get the slider's current position, which is defined as the variable "scrubTime"
		mmuVideo.currentTime = scrubTime; //the video's current time is dependent on the position of the slider
	}
	
	mmuVideo.addEventListener("timeupdate", movePlaySlider); //when the video's time updates, call "movePlaySlider" function
	function movePlaySlider()//'movePlaySlider' function makes the slider move in accordance to the video's current time
	{
		if (mmuVideo.currentTime > 0) //if video's current time is greater than 0...
		{
			scrubPlaySlider.value = (mmuVideo.currentTime/mmuVideo.duration) * 100; //the position of the slider is dependent on the video's current time as a percentage of the video's duration
		}
		else
		{
			scrubPlaySlider.value = 0; //sets the scrubPlaySlider value (Seek Bar) to "0"/"00:00"
		}
	}
	
	//Volume Bar
	var scrubVolumeSlider = document.getElementById ("volumeBar"); //defines the "volumeBar" input in the HTML document as the variable "scrubVolumeSlider"
	scrubVolumeSlider.addEventListener("input", scrubVolume); //when "scrubVolumeSlider" is in use, call "scrubVolume" function
	function scrubVolume() //'scrubVolume' function allows the user to change the video's volume via the Volume Bar
	{
		mmuVideo.volume = scrubVolumeSlider.value / 100; //the video's volume is dependent on the "scrubVolumeSlider" value as a percentage
		if (scrubVolumeSlider.value == 0) //if "scrubVolumeSlider" value is greater than 0...
		{
			muteButton.innerHTML = "Unmute"; //write "Unmute" in "muteButton" button
		}
		else 
		{
			muteButton.innerHTML = "Mute"; //write "Mute" in "muteButton" button
		}
	}
	
	//Duration Field
	var durationDisplay = document.getElementById ("durationField"); //defines the "durationField" input in the HTML document as the variable "durationDisplay"
	mmuVideo.addEventListener("durationchange", displayDuration); //when the video's duration changes, call "displayDuration" function
	function displayDuration() //'displayDuration' function displays the video's duration in minutes & seconds
	{
		var minutes = Math.floor (mmuVideo.duration / 60); //the default for the video's duration is set in seconds. the video in mintues is calculated by dividing the video's total seconds by 60. "Math.floor" returns the largest integer value possible. defines this calculation as the variable "minutes"
		var seconds = Math.floor (mmuVideo.duration % 60); //calculates the remainder of the video in seconds after dividing by 60. "Math.floor" returns the largest integer value possible. defines this calculation as the variable "seconds"
		if (minutes < 10) minutes = "0" + minutes; //if the video's minutes is less than 10, display a "0" before the video's minutes
		if (seconds < 10) seconds = "0" + seconds; //if the video's seconds is less than 10, display a "0" before the video's seconds
		durationDisplay.value = minutes + ":" + seconds; //the video's duration is displayed as: the video's minutes then semi-colon then the video's seconds 
	}
	
	//Playback Field
	var playbackDisplay = document.getElementById ("playbackField"); //defines the "playbackField" input in the HTML document as the variable "playbackDisplay"
	mmuVideo.addEventListener("timeupdate", playbackDuration); //when video's playback time updates, call "playbackDuration" function
	function playbackDuration() //'playbackDuration' function displays the video's current playback time in minutes & seconds
	{
		var minutes = Math.floor (mmuVideo.currentTime / 60); //the default for the video's current time is set in seconds. the video in mintues is calculated by dividing the video's current time by 60. "Math.floor" returns the largest integer value possible. defines this calculation as the variable "minutes"
		var seconds = Math.floor (mmuVideo.currentTime % 60); //calculates the remainder of the video current time in seconds after dividing by 60. "Math.floor" returns the largest integer value possible. defines this calculation as the variable "seconds"
		if (minutes < 10) minutes = "0" + minutes; //if the video's minutes is less than 10, display a "0" before the video's minutes
		if (seconds < 10) seconds = "0" + seconds; //if the video's seconds is less than 10, display a "0" before the video's seconds
		playbackDisplay.value = minutes + ":" + seconds; //the video's duration is displayed as: the video's minutes then semi-colon then the video's seconds 
		if (playbackDisplay.value == durationDisplay.value) //if the playback value equals the duration's value (1:40)...
		{
			stopVideo(); //call the 'stopVideo' function
		}
		else {}
	}
	
	//Playback Speed Changer
	var playbackSpeed = document.getElementById ("playbackSpeedField"); //defines the "playbackSpeedField" menu in the HTML document as the variable "playbackSpeed"
	playbackSpeed.addEventListener("change", playbackSpeedChanger); //when video's "playbackSpeed" selector changes, call "playbackSpeedChanger" function
	function playbackSpeedChanger() //'playbackSpeedChanger'changes the playback speed of the video
	{
		mmuVideo.playbackRate = playbackSpeed.value; //the video's playbackRate is dependent on the selected playback speed chosen in the "playbackSpeed" drop-down menu
		if (playbackSpeed.value > 2) //if the value in the playbackSpeed drop-down menu is greater than 2... 
		{
			fastForwardButton.innerHTML = ">>>"; //write ">>>" in "fastForwardButton" button
		}
		else if (playbackSpeed.value > 1 && playbackSpeed.value <= 2)  //if the value in the playbackSpeed drop-down menu is greater than 1 and less than or equal to 2...
		{
			fastForwardButton.innerHTML = ">>"; //write ">>" in "fastForwardButton" button
		}
		else {
			fastForwardButton.innerHTML = ">"; //write ">" in "fastForwardButton" button
		}
	}
	
	//Fast-Forward Button
	var fastForwardButton = document.getElementById ("fastForward"); //defines the "fastForward" button in the HTML document as the variable "fastForwardButton"
	fastForwardButton.addEventListener("mousedown", fastForwardVideo3x); //when the "fastForwardButton" button is held down, call "fastForwardVideo3x" function
	function fastForwardVideo3x() //'fastForwardVideo3x' function sets the video's playback rate to 3
	{
		mmuVideo.playbackRate = 3; //video's playbackRate = 3
		fastForwardButton.innerHTML = ">>>"; //write ">>>" in "fastForwardButton" button
		playbackSpeed.value = mmuVideo.playbackRate; //drop-down menu's displayed value corresponds to the video's playback rate
	}
	
	fastForwardButton.addEventListener("mouseup", fastForwardVideo2x); //when "fastForwardButton" button is released, call "fastForwardVideo2x" function
	function fastForwardVideo2x() //'fastForwardVideo3x' function sets the video's playback rate to 2
	{
		mmuVideo.playbackRate = 2; //video's playbackRate = 2
		fastForwardButton.innerHTML = ">>"; //write ">>" in "fastForwardButton" button
		playbackSpeed.value = mmuVideo.playbackRate; //drop-down menu's displayed value corresponds to the video's playback rate
	}
	
	fastForwardButton.addEventListener("dblclick", fastForwardVideo1x); //when "fastForwardButton" button is double-clicked, call "fastForwardVideo1x" function
	function fastForwardVideo1x() //'fastForwardVideo3x' function sets the video's playback rate to 1
	{
		mmuVideo.playbackRate = 1; //video's playbackRate = 1
		fastForwardButton.innerHTML = ">"; //write ">" in "fastForwardButton" button
		playbackSpeed.value = mmuVideo.playbackRate; //drop-down menu's displayed value corresponds to the video's playback rate
	}
}