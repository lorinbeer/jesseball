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
 *   namespace wrapper object is TwoDee
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
 * author: Lorin Beer
 * email: lorin@adobe.com
 */

var TwoDee = {

    /**
     * calculate dot product
     */
    dotprod : function (j,k) {
        return (j[0] * k[0]) + (j[1] * k[1]);
    },

    /**
     * calculate 2D vector magnitude
     */
    vecmag : function (j) {
        return Math.sqrt(j[0]*j[0] + j[1]*j[1]);
    },

    /**
     * return a unit vector in the same direction of vector v
     *     undefined if passed vector has magnitude of 0  
     */
    unitvec : function (j) {
        var mag = vecmag(j);
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
        return unitvec( normal(j) );
    }
}
