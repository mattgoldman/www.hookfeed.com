$(document).ready(function(){
	$notifications_container = $('#notifications');
	$queued_notifications = $('.queued_notification');

	setInterval(function(){
		$notifications = $('.notification', $notifications_container);
		numNotifications = $notifications.length;

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

		 		// Remove last notification
		 		$notifications.last().remove();

				// Add new notification to the top
				html = "<div class=\"notification\" style=\"opacity: 0\">";
				html += $($queued_notifications[Math.floor(Math.random()*$queued_notifications.length)]).first().html();
				html += "</div>";
				$notifications_container.prepend(html);
				$('.notification', $notifications_container).first().animate({
					opacity: 1
				},
				{
					duration: 500,
					easing: 'easeOutCirc'
				});
		 	}
		});
	}, 3750);
});