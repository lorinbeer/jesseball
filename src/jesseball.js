

/**
 *
 *
 */


var JesseBall = {
    balls : [],
    walls : [],

    /**
     * update function
     */
    update : function () {
    
    },

    /**
     * initWalls
     *  set initial walls based on arena position and dimensions
     *  @param x topleft corner x position
     *  @param y topleft corner y position
     *  @param w arena width
     *  @param h arena height
     */
    initWalls : function (x,y,w,h) {
    // walls are defined by a two points, which are also interpreted as the extrema of a line segment 
    this.walls = [[x, y, x+w, y], // top horizontal
                  [x, y, x, y+h], // left vertical
                  [x, y+h, x+w, y+h ], // bottom horizontal
                  [x+w, y, x+w, y+h]]; // right vertical
    }
};




