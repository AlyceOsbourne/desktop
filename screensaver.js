document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector(".screensaver");
    const ctx = canvas.getContext("2d");
    let timeout;
    let particles = [];
    let rockets = [];
    const screensaver_timeout = 1000 * 60 * 2;2
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function hideCanvas() {
        canvas.style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        particles = [];
        rockets = [];
    }

    function showCanvas() {
        canvas.style.display = "block";
        animate();
    }

    function resetTimeout() {
        clearTimeout(timeout);
        hideCanvas();
        timeout = setTimeout(showCanvas, screensaver_timeout);
    }

    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);
    document.addEventListener("touchstart", resetTimeout);

    resetTimeout();

    class Particle {
        constructor(x, y, color, velocity) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = velocity;
            this.alpha = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.draw();
            this.velocity.x *= 0.99;
            this.velocity.y *= 0.99;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.01;
            if (this.alpha <= 0) {
                particles.splice(particles.indexOf(this), 1);
            }
        }
    }

    class Rocket {
        constructor(x, y, velocity) {
            this.x = x;
            this.y = y;
            this.velocity = velocity;
            this.lifespan = Math.random() * 60 + 80;
            this.age = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
            ctx.fillStyle = "white";
            ctx.fill();
        }

        update() {
            this.draw();
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.x += (Math.random() - 0.5) * 0.1;
            this.age++;
            if (this.age >= this.lifespan) {
                this.explode();
            }
        }

        explode() {
            for (let i = 0; i < 100; i++) {
                particles.push(
                    new Particle(
                        this.x,
                        this.y,
                        `hsl(${Math.random() * 360}, 50%, 50%)`, {
                            x: (Math.random() - 0.5) * (Math.random() * 8),
                            y: (Math.random() - 0.5) * (Math.random() * 8)
                        }
                    )
                );
            }
            rockets.splice(rockets.indexOf(this), 1);
        }
    }

    

    function launchRocket() {
        rockets.push(
            new Rocket(Math.random() * canvas.width, canvas.height, {
                x: (Math.random() - 0.5) * 2,
                y: -(Math.random() * 4 + 3)
            })
        );
    }

    function animate() {
        if (canvas.style.display === "none") {
            return;
        }
        requestAnimationFrame(animate);
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
            }
        });

        rockets.forEach((rocket, index) => {
            rocket.update();
            if (rockets.indexOf(rocket) === -1) {
                rockets.splice(index, 1);
            }
        });
    }

    animate();
    setInterval(launchRocket, 800);
});
