/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Emil Ramning website loaded 🚀"
        );


        /* =====================================
           SCROLL REVEAL
        ===================================== */

        const cards =
            document.querySelectorAll(
                ".projectCard"
            );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        cards.forEach(
            card => {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(30px)";

                card.style.transition =
                    "opacity .7s ease, transform .7s ease";

                observer.observe(card);

            }
        );


        /* =====================================
           CARD MOUSE EFFECT
        ===================================== */

        cards.forEach(
            card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();

                        const x =
                            event.clientX -
                            rect.left;

                        const y =
                            event.clientY -
                            rect.top;

                        const rotateX =
                            ((y / rect.height) - .5) * -4;

                        const rotateY =
                            ((x / rect.width) - .5) * 4;

                        card.style.transform =
                            `translateY(-8px)
                             perspective(800px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "translateY(0)";

                    }
                );

            }
        );

    }
);
