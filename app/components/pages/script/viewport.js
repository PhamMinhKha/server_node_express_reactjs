import $ from 'jquery';
exports.handleScroll = (event) => {
    // var thisReact = this;
    $(".video").each(function (index) {
        var video = $(this).get(0);
        var test = isOnScreen($(this));
        if (test) {
            try {
                // console.log(video.readyState );
                var isPlaying = !(video.currentTime > 0) && !video.ended &&
                    video.readyState >= 2;

                if (isPlaying) {
                    video.play();
                }
                // $(this).get(0).play();
            } catch (err) {
                console.log('error play')
            }
        } else {
            try {
                // console.log($(this).attr('id') + video.currentTime);
                var isPlaying = video.currentTime > 0 && !video.paused && !video.ended &&
                    video.readyState > 2;

                if (isPlaying) {
                    video.pause();
                }
                // $(this).get(0).pause();
            } catch (err) {
                console.log('error pause');
            }
        }

    });
}

function isOnScreen(ele) {

    try {
        var win = $(window);

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = ele.offset();
        bounds.right = bounds.left + ele.outerWidth();
        bounds.bottom = bounds.top + ele.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    } catch (err) {
        console.log('err' + err);
    }
};