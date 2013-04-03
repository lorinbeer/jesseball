/**
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
        position : [85,475]
    },
    // walls are defined by a two points, which are also interpreted as the extrema of a line segment 
    walls : [[0, 0, settings.arena[0], 0], // top horizontal
             [0, 0, 0, settings.arena[1]], // left vertical
             [0, settings.arena[1], settings.arena[0], settings.arena[1] ], // bottom horizontal
             [settings.arena[0], 0, settings.arena[0], settings.arena[1]] ] // right vertical
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
    console.log("ball position: ", ball.position);
    ball.position[0] = ball.vector[0] + ball.position[0];
    ball.position[1] = ball.vector[1] + ball.position[1];
    console.log("ball position updated: ", ball.position);
    // iterate through wall list

    for (var i = 0; i < go.walls.length; i++) {
        console.log("iteration: ", i);
        var wall = go.walls[i];
        if (intersect(go.walls[i], go.ball)) {
            console.log("HIT!"); 
            var wallvec = [wall[2]-wall[0],wall[1]-wall[3]];            
            ball.vector = reflect(wallvec, ball.vector);
            console.log("ball vector ",ball.vector );
        }
    }
}

/**
 * intersect
 */
function intersect(wall, ball) {
    // if the wall array has more than 4 elements, someone's doing it wrong
    var dist = la2d.pointlinedistance( [wall[0],wall[1]], [wall[2],wall[3]], ball.position);
    console.log('distance: ', dist, 'to wall: ', wall);
    if ( dist < ball.radius ) {
        return true;
    }
}

/**
 * reflect incident vector i about the normal of surface vector s
 */
function reflect(s, i) {
    console.log( "surface: ", s, " unit normal: ", la2d.unitnormal(s), " vector: ", i );
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
