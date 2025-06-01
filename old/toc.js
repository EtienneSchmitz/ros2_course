// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="bienvenue.html">Bienvenue</a></li><li class="chapter-item expanded affix "><li class="part-title">Journée - Introduction à ROS 2</li><li class="chapter-item expanded "><a href="introduction/ressources.html"><strong aria-hidden="true">1.</strong> Ressources</a></li><li class="chapter-item expanded "><a href="introduction/installation.html"><strong aria-hidden="true">2.</strong> Installation - ROS 2</a></li><li class="chapter-item expanded "><a href="introduction/activites.html"><strong aria-hidden="true">3.</strong> Atelier - Introduction à ROS 2</a></li><li class="chapter-item expanded "><a href="introduction/quiz.html"><strong aria-hidden="true">4.</strong> Quiz - Introduction ROS2</a></li><li class="chapter-item expanded affix "><li class="part-title">Journée - Navigation</li><li class="chapter-item expanded "><a href="navigation/ressources.html"><strong aria-hidden="true">5.</strong> Ressources</a></li><li class="chapter-item expanded "><a href="navigation/installation.html"><strong aria-hidden="true">6.</strong> Installation - Turtlebot 3</a></li><li class="chapter-item expanded "><a href="navigation/activites.html"><strong aria-hidden="true">7.</strong> Atelier - Navigation (TurtleBot 3) avec ROS 2</a></li><li class="chapter-item expanded affix "><li class="part-title">Journée - Vision et IA</li><li class="chapter-item expanded "><a href="vision_ia/ressources.html"><strong aria-hidden="true">8.</strong> Ressources</a></li><li class="chapter-item expanded "><a href="vision_ia/activites.html"><strong aria-hidden="true">9.</strong> Atelier - Vision et IA avec ROS 2</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="vision_ia/activities/opencv.html"><strong aria-hidden="true">9.1.</strong> Ateliers - OpenCV</a></li><li class="chapter-item expanded "><a href="vision_ia/activities/pytorch.html"><strong aria-hidden="true">9.2.</strong> Ateliers - PyTorch</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Journée - Manipulation</li><li class="chapter-item expanded "><a href="manipulation/ressources.html"><strong aria-hidden="true">10.</strong> Ressources</a></li><li class="chapter-item expanded "><a href="manipulation/installation.html"><strong aria-hidden="true">11.</strong> Installation</a></li><li class="chapter-item expanded "><a href="manipulation/activites.html"><strong aria-hidden="true">12.</strong> Atelier - Manipulation avec ROS 2</a></li><li class="chapter-item expanded affix "><li class="part-title">Journée - Intégration</li><li class="chapter-item expanded "><a href="integration/activites.html"><strong aria-hidden="true">13.</strong> Atelier - Projet Intégration avec ROS 2</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
