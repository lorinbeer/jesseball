/**
 * Copyright 2013 Adobe Systems Incorporated
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


/**
 * Simple Linear Algebra Math Library for JavaScript
 *   namespace wrapper object is la2d
 *
 * Function List
 *  dotprod(j, k)
 *    calculate dotproduct of vectors j and k
 *  vecmag(j)
 *    calculate scalar magnitude of vector j
 *  unitvec(j)
 *    returns a unit vector in the same direction as j
 *  normal(j)
 *    returns a vector normal (orthogonal) to j
 *  unitnorm(j)
 *    returns a unit vector normal to vector j
 *
 *
 *
 * author: Lorin Beer
 * email: lorin@adobe.com
 */

var la2d = {

    /**
     * calculate dot product of vectors j and k
     */
    dotprod : function (j,k) {
        return (j[0] * k[0]) + (j[1] * k[1]);
    },

    /**
     * calculate the cross product of vectors j and k
     */
    crossprod : function (j,k) {
        return j[0] * k[1] - j[1] * k[0];
    },

    /**
     * returns the euclidean norm, the magnitude of the vector from the origin to point p=(x,y)
     */
    hypot : function (x,y) {
        return Math.sqrt(x*x + y*y);
    },

    /**
     * calculate 2D vector magnitude
     */
    vecmag : function (j) {
        return la2d.hypot(j[0],j[1]);
    },

    /*
     *     undefined if passed vector has magnitude of 0  
     */
    unitvec : function (j) {
        var mag = la2d.vecmag(j);
        if (mag == 0) {
            return;
        }
        return [j[0] / mag, j[1] / mag];
    },

    /**
     * simple normal vector generation
     */
    normal : function (j) {
        return [-j[1], j[0]];
    },

    /**
     * returns unit normal vector of vector v
     */
    unitnormal : function (j) {
        return la2d.unitvec( la2d.normal(j) );
    },

   /**
    * calculate minimum distance from point p to line ab
    */
    pointlinedistance : function (a,b,p) {
        var j = [b[0]-a[0],b[1]-a[1]];
        var num = Math.abs( la2d.crossprod(j, [p[0]-a[0],p[1]-a[1]]) );
        return num / la2d.vecmag(j);
    }
}
