notificationLinkClicked = function(event){
	event.stopPropagation();

	alert('We get it, you think this is awesome. But it\'s just a teaser page. If you want the real deal, reserve your spot below.');

	return false;
};

$(document).ready(function(){
	var $notifications_container = $('#notifications');
	var $queued_startup_notifications = $('.queued_notification.startups');
	var $queued_developer_notifications = $('.queued_notification.developers');
	var $queued_marketer_notifications = $('.queued_notification.marketers');
	var $queued_freelancer_notifications = $('.queued_notification.freelancers');
	var $queued_notifications = $queued_startup_notifications;
	var currentUseCase = 'startups';

	// Notifications Navigation
	$navLinks = $('a', '#navigation nav');
	$navLinks.on('click', function(){
		event.stopPropagation();

		oldUseCase = currentUseCase;
		currentUseCase = $(this).text().toLowerCase();

		if(oldUseCase != currentUseCase){
			// Select new button
			$navLinks.removeClass('selected');
			$(this).addClass('selected');


			$notifications = $('.notification', $notifications_container);
			numNotifications = $notifications.length;

			// Slide remaining notifications
			$notifications.animate({
				top: '+=400px',
				opacity: 0
			},
			{
				duration: 500,
				easing: 'easeOutExpo',
				complete: function(){
	 				// Only run this callback once at the end
	 				if( --numNotifications > 0 ) return;

					// Add new notification to the top
					addNotification();

					//CLEAR TIMEOUT? TODO
				}
			});
		}

		return false;
	});

	// Bind clicks on first 3 notifications
	$('.notification').on('click', 'a', notificationLinkClicked);

	nextNotification = function(){
		/*if(currentUseCase == 'startups'){
			$queued_notifications = $queued_startup_notifications;
		}else if(currentUseCase == 'developers'){
			$queued_notifications = $queued_developer_notifications;
		}else if(currentUseCase == 'marketers'){
			$queued_notifications = $queued_marketer_notifications;
		}else if(currentUseCase == 'freelancers'){
			$queued_notifications = $queued_freelancer_notifications;
		}*/
		$queued_notifications = $('.queued_notification');

		html = "<div class=\"notification\" style=\"opacity: 0\">";
		html += $($queued_notifications[Math.floor(Math.random()*$queued_notifications.length)]).first().html();
		html += "</div>";

		return html;
	}

	addNotification = function(){
		$notifications_container.prepend(nextNotification());

		$('.notification', $notifications_container).first().animate({
			opacity: 1
		},
		{
			duration: 750,
			easing: 'easeOutCirc'
		}).on('click', 'a', notificationLinkClicked);
	}

	cycleNotifications = function(){
		$notifications = $('.notification', $notifications_container);
		numNotifications = $notifications.length;

		// Add new notification to the top
		addNotification();

		// Start fading out last notification
		$notifications.last().animate({
			opacity: 0
		},
		{
			duration: 250,
			easing: 'easeOutExpo'
		});

		// Slide down notifications
		$notifications.animate({
	 		top: "+=108px"
	 	},
	 	{
	 		duration: 400,
	 		easing: 'easeOutQuint',
	 		complete: function(){
	 			// Only run this callback once at the end
	 			if( --numNotifications > 0 ) return;

		 		// Remove last notification and unbind click event
		 		$notifications.last().off('click', 'a', notificationLinkClicked).remove();
		 	}
		});

		millisecondsOptions = [3400, 3000, 3700, 3200, 3800, 3600, 4000, 3900];
		randomMilliseconds = millisecondsOptions[Math.floor(Math.random() * millisecondsOptions.length)];

		setTimeout(cycleNotifications, randomMilliseconds);
	}

	setTimeout(cycleNotifications, 2500);
});