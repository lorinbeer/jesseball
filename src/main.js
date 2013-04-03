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


function initGame() {
    JesseBall.initWalls(0,0,500,500);
}


var go = {
    balls : [],
    ball : {
        radius : 10,
        vector : [5.0,6.0],
        position : [85,475]
    },
}



function mainloop() {   
    var canvas=document.getElementById("maincanvas");
    var ctx=canvas.getContext('2d');
 
    updateball(go.ball);  
   /* 
    for (var i = 0; i < go.walls.length; i++) {
        intersect(go.walls[i], go.ball);
    }
 */
    drawarena();
    drawball();
    
    window.requestAnimFrame(mainloop);
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
    ctx.arc(go.ball.position[0],
            go.ball.position[1],
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
    ball.position[0] = ball.vector[0] + ball.position[0];
    ball.position[1] = ball.vector[1] + ball.position[1];
    // iterate through wall list

    for (var i = 0; i < JesseBall.walls.length; i++) {
        var wall = JesseBall.walls[i];
        if (intersect(JesseBall.walls[i], go.ball)) {
            var wallvec = [wall[2]-wall[0],wall[1]-wall[3]];            
            ball.vector = reflect(wallvec, ball.vector);
        }
    }
}

/**
 * intersect
 */
function intersect(wall, ball) {
    // if the wall array has more than 4 elements, someone's doing it wrong
    var dist = la2d.pointlinedistance( [wall[0],wall[1]], [wall[2],wall[3]], ball.position);
    if ( dist < ball.radius ) {
        return true;
    }
}

/**
 * reflect incident vector i about the normal of surface vector s
 */
function reflect(s, i) {
    var n = la2d.unitnormal(s);
    var scalar = 2 * la2d.dotprod(n,i); //scalar multiplier for normal
    var term = [scalar * n[0], scalar * n[1]];
    return [-1*(term[0]-i[0]),-1*( term[1]-i[1])];
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

