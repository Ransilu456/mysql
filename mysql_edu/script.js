document.addEventListener('DOMContentLoaded', function () {

    var simBtns = document.querySelectorAll('.sim-btn');
    simBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = btn.getAttribute('data-target');
            simBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            document.querySelectorAll('.sim-view').forEach(function (v) {
                v.classList.remove('active');
                if (v.id === 'sim-' + target) { v.classList.add('active'); }
            });
        });
    });

    var tocLinks = document.querySelectorAll('.toc-link');
    var moduleLabel = document.getElementById('current-module');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                var link = document.querySelector('.toc-link[href="#' + id + '"]');
                if (link) {
                    tocLinks.forEach(function (l) { l.classList.remove('active'); });
                    link.classList.add('active');
                    if (moduleLabel) { moduleLabel.textContent = link.textContent.trim(); }
                }
            }
        });
    }, { rootMargin: '-10% 0px -80% 0px' });

    document.querySelectorAll('.doc-section').forEach(function (s) { observer.observe(s); });

    window.checkQuiz = function (btn, correct) {
        var fb = document.getElementById('quiz-feedback');
        if (!fb) return;
        fb.className = 'quiz-feedback ' + (correct ? 'success' : 'error');
        fb.textContent = correct ? 'Correct! 1NF ensures atomicity of data.' : 'Not quite. Try again!';
    };
});
