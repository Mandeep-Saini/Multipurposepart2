/*Monika  */
$(document).ready(
            function() {
                var clockFace = document.getElementById("canvas");
                var ctx = clockFace.getContext("2d");
                var radius = clockFace.height / 2;
                ctx.translate(radius, radius);
                radius = radius * 0.90;
                $("#zones").change(function() {
                    clockFace.style.display = "block";
                    ctx.clearRect(-200, -200, clockFace.width, (clockFace.height));
                    setInterval(clock, 1000);
                });

                function clock() {
                    face(ctx, radius);
                    numbers(ctx, radius);
                    time(ctx, radius);
                }

                function face(ctx, radius) {
                    var grad;
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
                    grad.addColorStop(0, '#333');
                    grad.addColorStop(0.5, 'white');
                    grad.addColorStop(1, '#333');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = radius * 0.1;
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
                    ctx.fillStyle = '#333';
                    ctx.fill();
                }

                function numbers(ctx, radius) {
                    var ang;
                    var num;
                    ctx.font = radius * 0.15 + "px arial";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    for (num = 1; num < 13; num++) {
                        ang = num * Math.PI / 6;
                        ctx.rotate(ang);
                        ctx.translate(0, -radius * 0.85);
                        ctx.rotate(-ang);
                        ctx.fillText(num.toString(), 0, 0);
                        ctx.rotate(ang);
                        ctx.translate(0, radius * 0.85);
                        ctx.rotate(-ang);
                    }
                }

                function time(ctx, radius) {
                    var now = new Date();
                    var utc = now.getTime() + (now.getTimezoneOffset() * 60000);

                    // Date object for the requested city
                    var offset = $("#zones").val();
                    var newdate = new Date(utc + (3600000 * offset));
                    document.getElementById('time').innerHTML = newdate;
                    // $("#time").html(newdate);
                    if (newdate == '') return;
                    var hour = newdate.getHours();
                    var minute = newdate.getMinutes();
                    var second = newdate.getSeconds();
                    //hour
                    hour = hour % 12;
                    hour = (hour * Math.PI / 6) +
                        (minute * Math.PI / (6 * 60)) +
                        (second * Math.PI / (360 * 60));
                    hand(ctx, hour, radius * 0.5, radius * 0.07);
                    //minute
                    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
                    hand(ctx, minute, radius * 0.8, radius * 0.07);
                    // second
                    second = (second * Math.PI / 30);
                    hand(ctx, second, radius * 0.9, radius * 0.02);

                }

                function hand(ctx, pos, length, width) {
                    ctx.beginPath();
                    ctx.lineWidth = width;
                    ctx.lineCap = "round";
                    ctx.moveTo(0, 0);
                    ctx.rotate(pos);
                    ctx.lineTo(0, -length);
                    ctx.stroke();
                    ctx.rotate(-pos);
                }
            });
