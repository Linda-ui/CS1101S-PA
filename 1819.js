// QUESTION 1

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
    const result = test_func();
    const is_equal = (is_array(truth)? equal_array(result, truth)
                                     : equal(result, truth));
    if (is_equal) {
        display(test_name + ": PASSED");
    } else {
        display(test_name + ": FAILED <<<");
    }
}
//===============================================================



//===============================================================
// TASK 1A
//===============================================================
function make_big_int_from_number(num) {

    // WRITE HERE.
    if (num < 10) {
        return pair(num, null);
    } else {
        const a = num % 10;
        return pair(a, make_big_int_from_number((num - a) / 10));
    }

}


// TASK 1A TESTS
assert("1A_1", () => make_big_int_from_number(0),
    list(0), []);
assert("1A_2", () => make_big_int_from_number(5),
    list(5), []);
assert("1A_3", () => make_big_int_from_number(10),
    list(0,1), []);
assert("1A_4", () => make_big_int_from_number(1234),
    list(4,3,2,1), []);
assert("1A_5", () => make_big_int_from_number(9876543210),
    list(0,1,2,3,4,5,6,7,8,9), []);


//===============================================================
// TASK 1B
//===============================================================
function big_int_to_string(bint) {

    // WRITE HERE.
    return is_null(bint) 
           ? ''
           : big_int_to_string(tail(bint)) + stringify(head(bint));
    

}


// TASK 1B TESTS
assert("1B_1", () => big_int_to_string(list(0)),
    "0", []);
assert("1B_2", () => big_int_to_string(list(5)),
    "5", []);
assert("1B_3", () => big_int_to_string(list(0,1)),
    "10", []);
assert("1B_4", () => big_int_to_string(list(4,3,2,1)),
    "1234", []);
assert("1B_5", () => big_int_to_string(list(0,1,2,3,4,5,6,7,8,9)),
    "9876543210", []);
assert("1B_6", () => big_int_to_string(
    list(1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9)),
    "9876543210987654321", []);


//===============================================================
// TASK 1C
//===============================================================
function big_int_add(bintX, bintY) {
    // You may modify the given partial implementation,
    // or remove it and write your own.

    function add(x, y, carry) {
        if (is_null(x) && is_null(y)) {
            return (carry === 0) ? null : pair(carry, null);
        } else {

            // WRITE HERE.
                const a = (is_null(x) ? 0 : head(x)) + 
                (is_null(y) ? 0 : head(y)) + carry;
                const newdg = a % 10;
                const newcarry = (a - newdg) / 10;
                
                
                return pair(newdg, add((is_null(x) ? x : tail(x)),
                (is_null(y) ? y : tail(y)), newcarry));
            
            


        }
    }
    //display_list(add(bintX, bintY, 0));
    return add(bintX, bintY, 0);
}


// TASK 1C TESTS
//assert("1C_1", () => big_int_add(list(0), list(3,2,1)),
    //list(3,2,1), ["make_big_int_from_number"]);
//assert("1C_2", () => big_int_add(list(5,6,7), list(0)),
    //list(5,6,7), ["make_big_int_from_number"]);
//assert("1C_3", () => big_int_add(list(4,3,2,1), list(5,4,3,2)),
    //list(9,7,5,3), ["make_big_int_from_number"]);
//assert("1C_4", () => big_int_add(list(7,8,9), list(5,6)),
    //list(2,5,0,1), ["make_big_int_from_number"]);
//assert("1C_5", () => big_int_add(list(5,6), list(7,8,9)),
    //list(2,5,0,1), ["make_big_int_from_number"]);
assert("1C_6", () => big_int_add(
    list(9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9), list(5)),
    list(4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),
    ["make_big_int_from_number"]);


//===============================================================
// TASK 1D
//===============================================================
function big_int_mult_by_digit(bint, digit) {

    // WRITE HERE.
    if (digit === 0) {
        return list(0);
    }
    function mul(x, y, carry) {
        if (is_null(x)) {
            return carry === 0 ? null : pair(carry, null);
        } else {
            const a = head(x) * y + carry;
            const num = a % 10;
            return pair(num, mul(tail(x), y, ((a - num) / 10)));
        }
        
    }
    //display(mul(bint, digit, 0));
    return mul(bint, digit, 0);

}


// TASK 1D TESTS
assert("1D_1", () => big_int_mult_by_digit(list(0), 5),
    list(0), ["make_big_int_from_number", "big_int_add"]);
assert("1D_2", () => big_int_mult_by_digit(list(7,4,3), 0),
    list(0), ["make_big_int_from_number", "big_int_add"]);
assert("1D_3", () => big_int_mult_by_digit(list(7,4,3), 5),
    list(5,3,7,1), ["make_big_int_from_number", "big_int_add"]);
assert("1D_4", () => big_int_mult_by_digit(
    list(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9), 3),
    list(3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,2),
    ["make_big_int_from_number", "big_int_add"]);


//===============================================================
// TASK 1E
//===============================================================
function big_int_mult_by_10_pow_n(bint, n) {

    // WRITE HERE.
    return n === 0 || head(bint) === 0
           ? bint
           : append(build_list(x => 0, n), bint);

}


// TASK 1E TESTS
assert("1E_1", () => big_int_mult_by_10_pow_n(list(0), 5),
    list(0),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_2", () => big_int_mult_by_10_pow_n(list(7,4,3), 0),
    list(7,4,3),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_3", () => big_int_mult_by_10_pow_n(list(7,4,3), 3),
    list(0,0,0,7,4,3),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_4", () => big_int_mult_by_10_pow_n(list(5,8,3,1), 20),
    list(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,8,3,1),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);


//===============================================================
// TASK 1F
//===============================================================
function big_int_mult(bintX, bintY) {

    // WRITE HERE.
    let y = bintY;
    let s = null;
    for (let r = 0; r < length(bintY); r = r + 1) {
        const a = big_int_mult_by_10_pow_n(bintX, r);
        const b = big_int_mult_by_digit(a, head(y));
        s = pair(b, s);
        y = tail(y);
    }
    
    const k = accumulate(
        big_int_add, null, s);
        display_list(k);
        return k;
        
    

}


// TASK 1F TESTS
assert("1F_1", () => big_int_mult(list(0), list(0)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_2", () => big_int_mult(list(0), list(3,2,1)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_3", () => big_int_mult(list(3,2,1), list(0)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_4", () => big_int_mult(list(3,2,1), list(1)),
    list(3,2,1),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_5", () => big_int_mult(list(9), list(6)),
    list(4,5),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_6", () => big_int_mult(list(7,8,9), list(5,6)),
    list(5,5,1,4,6),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_7", () => big_int_mult(
    list(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1), list(7,8,9)),
    list(7,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,9),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);


//===============================================================


// QUESTION 2

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.

/*
//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
    const result = test_func();
    const is_equal = (is_array(truth)? equal_array(result, truth)
                                     : equal(result, truth));
    if (is_equal) {
        display(test_name + ": PASSED");
    } else {
        display(test_name + ": FAILED <<<");
    }
}
//===============================================================
*/


//===============================================================
// DO NOT REMOVE OR MODIFY THE FOLLOWING FUNCTIONS.
// You may call them in your functions.
//===============================================================
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
//---------------------------------------------------------------
function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}
//---------------------------------------------------------------
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}
//---------------------------------------------------------------
function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}
//---------------------------------------------------------------
function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}
//---------------------------------------------------------------
// Sorts the array of numbers in ascending order.
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
//---------------------------------------------------------------
function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
// const D = [8, 3, 9, 2, 8, 1];
// digits_to_string(D);  // returns "839281"
//===============================================================
// DO NOT REMOVE OR MODIFY THE ABOVE FUNCTIONS.
//===============================================================



//===============================================================
// TASK 2A
//===============================================================
function build_largest_int(digits) {

    // WRITE HERE.
    let digits1 = copy_array(digits);
    
    sort_ascending(digits1);
    reverse_array(digits1);
    let s = '';
    for (let r = 0; r < array_length(digits1); r = r + 1) {
        s = s + stringify(digits1[r]);
    }
    return s;

}


// TASK 2A TESTS
assert("2A_1", () => build_largest_int([1]),
    "1", []);
assert("2A_2", () => build_largest_int([1,2,3,4,5]),
    "54321", []);
assert("2A_3", () => build_largest_int([9,8,7]),
    "987", []);
assert("2A_4", () => build_largest_int([4,1,9,1,4,9,1]),
    "9944111", []);
assert("2A_5", () => build_largest_int([5,5,5,5,5,5,7,5,5,5]),
    "7555555555", []);
assert("2A_6", () => build_largest_int([5,5,5,5,5,5,5,5,5,5]),
    "5555555555", []);


//===============================================================
// TASK 2B
//===============================================================
function build_2nd_largest_int(digits) {

    // WRITE HERE. 9,4,4,1,1
    let digits1 = copy_array(digits);
    sort_ascending(digits1);
    //display(digits1,'first');
    
    let prev = digits1[0];
    let firstin = 0;
    
    for (let r = 1 ; r < array_length(digits1) ; r = r + 1) {
        if (digits1[r] !== prev) {
            swap(digits1, firstin, r);
            break;
        } else if (digits1[r] === prev) {
            firstin = r;
        }
    }
    reverse_array(digits1);
    //display(digits1);
    return digits_to_string(digits1);
    

}


// TASK 2B TESTS
assert("2B_1", () => build_2nd_largest_int([1]),
    "1", ["build_largest_int"]);
assert("2B_2", () => build_2nd_largest_int([1,2,3,4,5]),
    "54312", ["build_largest_int"]);
assert("2B_3", () => build_2nd_largest_int([9,8,7]),
    "978", ["build_largest_int"]);
assert("2B_4", () => build_2nd_largest_int([4,1,9,1,4,9,1]),
    "9941411", ["build_largest_int"]);
assert("2B_5", () => build_2nd_largest_int([5,5,5,5,5,5,7,5,5,5]),
    "5755555555", ["build_largest_int"]);
assert("2B_6", () => build_2nd_largest_int([5,5,5,5,5,5,5,5,5,5]),
    "5555555555", ["build_largest_int"]);


//===============================================================
// TASK 2C
//===============================================================
function permutations(s) {
    return is_null(s) 
           ? list(null)
           : accumulate(append, null, map(x => map(p => pair(x, p), permutations(remove(x,s))),
             s));}

function build_nth_largest_int(digits, n) {

    // WRITE HERE.
    let digits1 = copy_array(digits);
    
    const d = array_to_list(digits1);
    //display_list(d,'d');
    
    const perms = permutations(d);
    const perms1 = map(x=> digits_to_string(list_to_array(x)), perms);
    //display_list(perms);
    const permsarr = list_to_array(perms1);
    //display(permsarr,'permsarr');
    sort_ascending(permsarr);
    reverse_array(permsarr);
    
    //display(permsarr,'permsarr');
    
    return n >= array_length(permsarr) ? permsarr[array_length(permsarr) - 1]
    : permsarr[n - 1];
    
    
    
}
    




// TASK 2C TESTS
assert("2C_1", () => build_nth_largest_int([1,2,4,3], 1),
    "4321", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_2", () => build_nth_largest_int([3,1,4,2], 2),
    "4312", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_3", () => build_nth_largest_int([3,1,4,2], 10),
    "3214", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_4", () => build_nth_largest_int([1,3,4,2], 18),
    "2134", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_5", () => build_nth_largest_int([3,1,4,2], 24),
    "1234", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_6", () => build_nth_largest_int([4,3,2,1], 28),
    "1234", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_7", () => build_nth_largest_int([5,3,7], 1),
    "753", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_8", () => build_nth_largest_int([3,5,7], 4),
    "537", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_9", () => build_nth_largest_int([5,3,7], 6),
    "357", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_10", () => build_nth_largest_int([5,3,7], 10),
    "357", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_11", () => build_nth_largest_int([5], 10),
    "5", ["build_largest_int", "build_2nd_largest_int"]);

/*
//===============================================================


// QUESTION 3

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
    const result = test_func();
    const is_equal = (is_array(truth)? equal_array(result, truth)
                                     : equal(result, truth));
    if (is_equal) {
        display(test_name + ": PASSED");
    } else {
        display(test_name + ": FAILED <<<");
    }
}
//===============================================================

*/

//===============================================================
// TASK 3A(I)
//===============================================================
function count_lower_neighbors(emap, r, c) {

    // WRITE HERE.
    if (r ===0||r===array_length(emap)-1||c===0||c===array_length(emap[0])-1){
        return 0;
    }
    const b = emap[r][c];
    const a = list(pair(r-1,c-1),
    pair(r, c-1), pair(r+1, c-1), pair(r-1, c), pair(r+1, c),
    pair(r-1, c+1), pair(r, c+1), pair(r+1, c+1));
    
    return accumulate((x, y) => 
    
    emap[head(x)][tail(x)] < b
                                ? y + 1 : y, 
                                0, a);

}


// TASK 3A(I) TESTS
const emapA1 =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]];
assert("3A(I)_1", () => count_lower_neighbors([[5]], 0, 0), 0, []);
assert("3A(I)_2", () => count_lower_neighbors(emapA1, 0, 0), 0, []);
assert("3A(I)_3", () => count_lower_neighbors(emapA1, 5, 4), 0, []);
assert("3A(I)_4", () => count_lower_neighbors(emapA1, 4, 6), 0, []);
assert("3A(I)_5", () => count_lower_neighbors(emapA1, 1, 1), 1, []);
assert("3A(I)_6", () => count_lower_neighbors(emapA1, 2, 2), 8, []);
assert("3A(I)_7", () => count_lower_neighbors(emapA1, 2, 3), 5, []);
assert("3A(I)_8", () => count_lower_neighbors(emapA1, 4, 4), 6, []);


//===============================================================
// TASK 3A(II)
//===============================================================
function count_peaks(emap) {

    // WRITE HERE.
    let c = 0;
    for (let i = 0; i < array_length(emap); i = i + 1) {
        for (let j = 0; j < array_length(emap[0]); j = j + 1) {
            if (count_lower_neighbors(emap, i, j) === 8) {
                c = c + 1;
            }
        }
    }
    return c;

}


// TASK 3A(II) TESTS
const emapA2a =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]]; // 3 peaks
const emapA2b =
[[3, 1, 4, 1, 5, 1, 6, 1],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [1, 7, 1, 8, 1, 9, 1, 0],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [2, 1, 3, 1, 4, 1, 5, 2],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [1, 9, 1, 8, 1, 7, 1, 6],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [8, 1, 9, 1, 8, 1, 9, 1]]; // 9 peaks
assert("3A(II)_1", () => count_peaks([[5]]),
    0, ["count_lower_neighbors"]);
assert("3A(II)_2", () => count_peaks([[2,3,4],[3,5,3],[4,3,2]]),
    1, ["count_lower_neighbors"]);
assert("3A(II)_3", () => count_peaks(emapA2a),
    3, ["count_lower_neighbors"]);
assert("3A(II)_4", () => count_peaks(emapA2b),
    9, ["count_lower_neighbors"]);


//===============================================================
// TASK 3B
//===============================================================
function count_islands(emap) {
    // WRITE HERE.
    // ---BEGIN TASK---
    const R = array_length(emap);    // emap size is R x C.
    const C = array_length(emap[0]); // emap size is R x C.
    const label = [];                // 2D array for labelling islands.
    let island_count = 0;

    // The function island "floods" an entire island with
    // the label island_id, starting from the position (row, col).
    function label_island(row, col, island_id) {
        if ( row >= 0 && row < R && col >= 0 && col < C ) {
            if ( emap[row][col] !== 0 && label[row][col] === 0 ) {
                label[row][col] = island_id;
                label_island(row, col - 1, island_id);
                label_island(row, col + 1, island_id);
                label_island(row - 1, col, island_id);
                label_island(row + 1, col, island_id);
            } else {}
        } else {}
    }

    // The labels are initialized to 0.
    // The islands are going to be labelled from 1 onwards.
    for (let row = 0; row < R; row = row + 1) {
        label[row] = [];
        for (let col = 0; col < C; col = col + 1) {
            label[row][col] = 0;
        }
    }

    for (let row = 0; row < R; row = row + 1) {
        for (let col = 0; col < C; col = col + 1) {
            if (emap[row][col] !== 0 && label[row][col] === 0) {
                island_count = island_count + 1;
                label_island(row, col, island_count);
            } else {}
        }
    }
    return island_count;
    // ---END TASK---
}

// TASK 3B TESTS
const emapB1 =
[[2, 1, 0, 2, 1, 1, 3],
 [0, 1, 0, 1, 0, 0, 2],
 [0, 0, 0, 2, 3, 1, 1],
 [1, 0, 2, 0, 0, 0, 0],
 [0, 0, 1, 2, 0, 0, 0],
 [1, 0, 3, 0, 1, 1, 2]]; // 6 islands
const emapB2 =
[[1, 2, 0, 0, 1, 0, 0, 1],
 [1, 2, 2, 3, 1, 0, 2, 1],
 [0, 1, 1, 0, 1, 0, 0, 1],
 [0, 0, 0, 0, 0, 3, 3, 0],
 [1, 1, 2, 0, 0, 0, 0, 0],
 [1, 0, 1, 0, 0, 1, 2, 3],
 [1, 3, 2, 1, 1, 0, 1, 1]]; // 5 islands
//assert("3B_1", () => count_islands([[0]]), 0, []);
//assert("3B_2", () => count_islands([[1]]), 1, []);
//assert("3B_3", () => count_islands([[0,0], [0,0]]), 0, []);
//assert("3B_4", () => count_islands([[2,1], [1,3]]), 1, []);
//assert("3B_5", () => count_islands([[0,1], [0,0]]), 1, []);
//assert("3B_6", () => count_islands([[2,0], [0,1]]), 2, []);
assert("3B_7", () => count_islands(emapB1), 6, []);
assert("3B_8", () => count_islands(emapB2), 5, []);


//===============================================================






























