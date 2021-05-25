window.audioComments = {
	recordAudio: '',
	recordStatus: '',
	mediaStream: '',

	isMimeTypeSupported(mimeType) {
		
		return true;
		
		if (typeof MediaRecorder.isTypeSupported !== 'function') {
			return true;
		}
		if ( mimeType == 'audio/webm' && window.testDisableWebm ) {
			return false;
		}

		return MediaRecorder.isTypeSupported(mimeType);
	},

	record: function (x) {
		var self = $(x);

		if (!self.parent().children('div.audio-upload').length) {
			$('<div class="audio-upload"></div>').appendTo(self.parent());
		}

		var inputUpload = self.parent().children('div.audio-upload');
		var audioStatus = self.children('span.audio-status');
		var microphone = self.children('i.fa-microphone');

		if (
			!window.audioComments.recordStatus
			|| window.audioComments.recordStatus == 'stop'
		) {
			window.audioComments.recordStatus = 'allow';

			var buttons = $(
				[
					'<div class="audio-tip">',
					'<div class="tooltip-inner">',
					'<div class="audio-record"><span class="glyphicon glyphicon-record" aria-hidden="true"></span> запись</div>',
					'<div class="audio-cancel"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> отменить</div>',
					'<div class="audio-save"><span class="glyphicon glyphicon-stop" aria-hidden="true"></span> стоп</div> ',
					'</div></div>'
				].join(' ')).appendTo(self.next()).hide();

			audioStatus.show().html('разрешите доступ к микрофону...');
		}

		if (window.audioComments.recordStatus == 'allow') {
			window.audioComments.recordStatus = 'check';

			var recorderType = StereoAudioRecorder;
			var mimeType = "audio/wav";


			if ( this.isMimeTypeSupported("audio/webm") ) {
				recorderType = MediaStreamRecorder;
				mimeType = "audio/webm";
			}

			var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			if(isSafari){
				recorderType = StereoAudioRecorder;
				mimeType = "audio/wav";
			}

			window.navigator.mediaDevices.getUserMedia({audio: true})
				.then(function(localMediaStream) {

					window.audioComments.recordAudio = RecordRTC(localMediaStream, {
						type: 'audio',
						mimeType: mimeType,
						recorderType: recorderType,
						disableLogs: false
					});

					window.audioComments.mediaStream = localMediaStream;
					audioStatus.hide();
					buttons.show();
					window.audioComments.recordStatus = 'start';
				})
				.catch(function(err) {
					/* handle the error */
					audioStatus.show().html('доступ к микрофону запрещен!');
				});

			/*
			window.navigator.mediaDevices.getUserMedia({audio: true}, function (localMediaStream) {
				window.audioComments.recordAudio = RecordRTC(localMediaStream, {
					type: 'audio',
					mimeType: mimeType,
					recorderType: recorderType,
					disableLogs: false
				});

				window.audioComments.mediaStream = localMediaStream;
				audioStatus.hide();
				buttons.show();
				window.audioComments.recordStatus = 'start';

			}, function (e) {
				audioStatus.show().html('доступ к микрофону запрещен!');
			});
			*/
		}

		$('.audio-cancel', buttons).click(function () {
			if (window.audioComments.recordStatus == 'allow') {
				return;
			}
			microphone.css('color', '#999');
			if (window.audioComments.mediaStream) {
				window.audioComments.mediaStream.getAudioTracks()[0].stop();
			}
			audioStatus.html('');
			buttons.remove();
			window.audioComments.recordStatus = 'stop';
		});

		$('.audio-record', buttons).click(function() {
			if (window.audioComments.recordStatus == 'start') {
				window.audioComments.startRecord(audioStatus, microphone);
			}

		});

		//	var extension = this.isMimeTypeSupported("audio/webm") ? "webm" : "wav";
		var extension = isSafari ? "wav": "webm" ;

		$('.audio-save', buttons).click(function () {

			if (window.audioComments.recordStatus == 'recording') {
				buttons.remove();
				window.audioComments.recordStatus = 'stop';

				window.audioComments.recordAudio.stopRecording(function () {

					microphone.css('color', '#999');
					audioStatus.html('сохранение...');

					window.audioComments.mediaStream.getAudioTracks()[0].stop();

					var audioBlob = window.audioComments.recordAudio.getBlob();
					var formData = new FormData();
					var input = $('<input type="hidden" class="audio-value" name="GetCourseComment[audioFiles][]">');

					var now = new Date();
					var fileName = now.getFullYear() + '' + now.getMonth() + '' + now.getDate() + '' + now.getHours() + '' + now.getMinutes() + '' + now.getSeconds();
					fileName += '_';
					fileName += Math.round(Math.random() * 9999) + '.' + extension;

					formData.append('Filedata', audioBlob);
					formData.append('BlobfileName', fileName);

					var url = '/fileservice/widget/upload';
					if (window.accountId && window.fileserviceUploadHost) {
						url = location.protocol + "//" + window.fileserviceUploadHost + "/fileservice/widget/direct-upload?accountId=" + window.accountId;
					}

					$.ajax({
						url: url,
						type: 'POST',
						data: formData,
						processData: false,
						contentType: false,
						success: function (data) {
							if (data == 'Error') {
								alert('Невозможно сохранить файл!');
							} else {

								var info = $('<span class="audio-info">'
										+ '<span class="close-info" style="float:right;">x</span>'
										+ '<div>'
										+ '<audio controls=""><source src="' + data.download_url + '" type="audio/mpeg"></audio>'
										+ '<br>' + fileName
										+ '</div>'
										+ '</span>'
									 );
								$('.close-info', info).click(function () {
									info.remove();
								});

								input.val(data.hash);
								input.appendTo(info);
								info.appendTo(inputUpload);
								audioStatus.html('');
								self.parent().children('.comment-form-wrapper .new-comment .btn-send').show();
								self.next().next().children('.save-button').removeClass('disabled');
							}
						},
						error: function (error) {
							buttons.show();
							audioStatus.html('ошибка сохранения: ' + error.statusText);
						}
					});

				});
			}

		});
	},

	startRecord: function(audioStatus, microphone) {
		window.audioComments.recordAudio.startRecording();

		window.audioComments.recordStatus = 'recording';

		audioStatus.show().html('идет запись...');
		microphone.css('color', 'red');
		$('.audio-record').css('color', 'red');
	},

	init: function() {
		$('.audio-comment').on('click', function() {
			return window.audioComments.record(this);
		});
	}
};

$(function() {
	window.audioComments.init();

	$( document ).ready(function() {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mediaDevices.getUserMedia;
			window.URL = window.URL || window.webkitURL;



			if (window.AudioContext && window.navigator.getUserMedia && window.URL) {
				$('.audio-comment').show();
			}

		} catch (e) {
			$('.audio-comment').hide();
		}
	});

});