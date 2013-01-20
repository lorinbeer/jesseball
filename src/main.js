
/*
 Timer
 Score
 Lives
 Main Menu
 Game Mode
 ball bounce 45 to normal
 multiple balls
 barrier code
 hud - Jesse's grinning visage

  Lorin
  Tim
  Jesse
  and a big fuck you to the intern Ben

excess shit
high score 
sarcasm generated
*/
var settings = {
    arena : [500, 500]
}

var go = {
    balls : [],
    ball : {
        radius : 10,
        vector : [5.0,6.0],
        location : [100,100]
    },
    // 
    walls : [[0, 0, settings.arena[0], 0], // top horizontal
             [0, 0, 0, settings.arena[1]], // left vertical
             [0, settings.arena[1], settings.arena[0], settings.arena[1]], // bottom horizontal
             [settings.arena[0], 0, settings.arena[0], settings.arena[1]]]
}


function mainloop() {   
    var canvas=document.getElementById("maincanvas");
    var ctx=canvas.getContext('2d');
 
    updateball(go.ball);  
    
    for (var i = 0; i < go.walls.length; i++) {
        intersect(go.walls[i], go.ball);
    }
 
    drawarena();
    drawball();
}

function drawarena() {
    var canvas=document.getElementById("maincanvas");
    var ctx=canvas.getContext('2d');
    ctx.clearRect(0,0,500,500);
    ctx.lineWidth = 5;
    ctx.strokeRect(0,0,500,500);
}

function drawball() {
    var canvas=document.getElementById("maincanvas");
    var ctx=canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(go.ball.location[0],
            go.ball.location[1],
            go.ball.radius,
            0,
            2 * Math.PI,
            false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

function updateball(ball) {
    
    ball.location[0] = ball.vector[0] + ball.location[0];
    ball.location[1] = ball.vector[1] + ball.location[1];

    for (var i = 0; i < go.walls.length; i++) {
        if (intersect(go.walls[i], go.ball)) {
            var reflection = intersect(go.walls[i], go.ball);
            if (reflection) {
                ball.vector = reflection;
            }
        }
    }
/*
    if(ball.location[0] < 0) {
        ball.location[0] = 0;
        ball.vector[0] = -1 * ball.vector[0];
    } else if (ball.location[0] > 500) {
        ball.location[0] = 500;
        ball.vector[0] = -1 * ball.vector[0];
    }
  
    if(ball.location[1] < 0) {
        ball.location[1] = 0;
        ball.vector[1] = -1 * ball.vector[1];
    } else if (ball.location[1] > 500) {
        ball.location[1] = 500;
        ball.vector[1] = -1 * ball.vector[1];
    }
*/
}

function intersect(wall, ball) {
    // if the wall array has more than 4 elements, someone's doing it wrong
    if ((ball.location[0] < wall[0]) ||
        (ball.location[0] > wall[1]) ||
        (ball.location[1] < wall[2]) ||
        (ball.location[1] > wall[3])) {
        return reflect([wall[2]-wall[0], wall[3]-wall[1]], ball.vector);
    }
}

/**
 * reflect incident vector i about the normal of surface vector s
 */
function reflect(s, i) {
    var n = la2d.unitnormal(s);
    var scalar = -2 * la2d.dotprod(i,n); //scalar multiplier for normal

console.log(n, scalar);

    return [i[0] - scalar * n[0], i[1] - scalar * n[1]];
}

/**
 * 
 */
function bounce(wall, ball) {
    // [a2-a1,b2-b1]
    //var wallvect = [wall[0] - wall[2],
    //                wall[1] - wall[3]];
    // a dot b = ||a|| * b|| * cos theta == (a dot b) / (||a|| * ||b||) = cos theta, then remove arccos
    //  var theta = Math.acos (dotprod(wallvect, ball.vector) / (vecmag(wallvect) * vecmag(ball.vector)) );
}
