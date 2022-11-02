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

    if (num < 10) {
        return list(num);
    } else {
        function helper(n) {
            if (n === 0) {
                return null;
            }
            const lsd = n % 10;
            
            return pair(lsd, helper((n - lsd) / 10));
        }
        return helper(num);
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

    return accumulate((x, y) => y + stringify(x), '', bint);

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

    const len = length(bintX);
    
    let res = 0;
    for (let r = 1 ; r <= len; r = r + 1) {
        res = res + math_pow(10,r - 1) * list_ref(bintX, r - 1);
    }
    const x = res; 
    
    const len1 = length(bintY);
    
    let res1 = 0;
    for (let r = 1 ; r <= len1; r = r + 1) {
        res1 = res1 + math_pow(10,r - 1) * list_ref(bintY, r - 1);
    }
    const y = res1; 
    display(x,'x');
    display(y, 'y');
    return make_big_int_from_number(x + y);
    
}


// TASK 1C TESTS
assert("1C_1", () => big_int_add(list(0), list(3,2,1)),
    list(3,2,1), ["make_big_int_from_number"]);
assert("1C_2", () => big_int_add(list(5,6,7), list(0)),
    list(5,6,7), ["make_big_int_from_number"]);
assert("1C_3", () => big_int_add(list(4,3,2,1), list(5,4,3,2)),
    list(9,7,5,3), ["make_big_int_from_number"]);
assert("1C_4", () => big_int_add(list(7,8,9), list(5,6)),
    list(2,5,0,1), ["make_big_int_from_number"]);
assert("1C_5", () => big_int_add(list(5,6), list(7,8,9)),
    list(2,5,0,1), ["make_big_int_from_number"]);
assert("1C_6", () => big_int_add(
    list(9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9), list(5)),
    list(4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),
    ["make_big_int_from_number"]);


//===============================================================
// TASK 1D
//===============================================================
function big_int_mult_by_digit(bint, digit) {
    const len = length(bint);
    
    let res = 0;
    for (let r = 1 ; r <= len; r = r + 1) {
        res = res + math_pow(10,r - 1) * list_ref(bint, r - 1);
    }
   
    const output = res * digit;
    
    return make_big_int_from_number(output);
    

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

    return (equal(bint, list(0)) || n === 0)
        ? bint
        : pair(0, big_int_mult_by_10_pow_n(bint, n - 1));

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
    const len = length(bintX);
    
    let res = 0;
    for (let r = 1 ; r <= len; r = r + 1) {
        res = res + math_pow(10,r - 1) * list_ref(bintX, r - 1);
    }
    const x = res; 
    
    const len1 = length(bintY);
    
    let res1 = 0;
    for (let r = 1 ; r <= len1; r = r + 1) {
        res1 = res1 + math_pow(10,r - 1) * list_ref(bintY, r - 1);
    }
    const y = res1; 
    
    
    
    return make_big_int_from_number(x * y);
    

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

    sort_ascending(digits);
    reverse_array(digits);
    const l = array_to_list(digits);
    return accumulate((x,y) => stringify(x) + y, '', l);

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
    
    sort_ascending(digits);
    reverse_array(digits);
    let last = array_length(digits) - 1; //lastindex
    let ptr = last;
    
    while (ptr >= 0 && digits[ptr] === digits[last]  ) {
        last = ptr;
        ptr = ptr - 1;
    }
    
    if (ptr < 0) {
        return build_largest_int(digits);
    } else {
        swap(digits, last, ptr);
        const l = array_to_list(digits);
        return accumulate((x,y) => stringify(x) + y, '', l);
    }
    
    }




// TASK 2B TESTS
assert("2B_1", () => build_2nd_largest_int([1]),
    "1", ["build_largest_int"]);
assert("2B_2", () => build_2nd_largest_int([1,2,3,4,5]),
    "54312", ["build_largest_int"]);
assert("2B_3", () => build_2nd_largest_int([9,8,7]),
    "978", ["build_largest_int"]);
assert("2B_4", () => build_2nd_largest_int([4,1,9,1,4,9,1]),
    "9941411", ["build_largest_int"]); //9944111- 9941411
assert("2B_5", () => build_2nd_largest_int([5,5,5,5,5,5,7,5,5,5]),
    "5755555555", ["build_largest_int"]);
assert("2B_6", () => build_2nd_largest_int([5,5,5,5,5,5,5,5,5,5]),
    "5555555555", ["build_largest_int"]);


//===============================================================
// TASK 2C
//===============================================================
function build_nth_largest_int(digits, n) {

    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }

    const S = copy_array(digits);
    const len = array_length(S);
    sort_ascending(S);
    reverse_array(S);
    const digit_lst = array_to_list(S);
    const perms = permutations(digit_lst);
    const nth_lst = list_ref(perms, math_min(length(perms), n) - 1);
    const nth = list_to_array(nth_lst);
    return digits_to_string(nth);
    

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


//===============================================================
// QUESTION 3

//===============================================================



//===============================================================
// TASK 3A(I)
//===============================================================
function count_lower_neighbors(emap, r, c) {
     
    if (r <= 0 || c <= 0 || r >= array_length(emap) - 1 || c >= array_length(emap[0]) - 1){
        return 0;
    }
    
    const x = emap[r][c];
    let a = 0;
    function helper(r, c) {
        
        if (emap[r][c] < x) {
            a = a + 1;
        }
    }
    helper(r, c - 1);
    helper(r, c + 1);
    helper(r - 1, c);
    
    helper(r + 1, c - 1);
    helper(r - 1, c - 1);
    helper(r - 1, c + 1);
    helper(r + 1, c);
    helper(r + 1, c +1 );

    return a;

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
    const maxr = array_length(emap);
    const maxc = array_length(emap[0]);
    let a = 0;
    for (let i = 0; i < maxr; i = i + 1){
        for (let j = 0; j < maxc; j = j + 1) {
            if (count_lower_neighbors(emap, i, j) === 8) {
                a = a + 1;
            }
        }
    }
    return a;

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
function count_islands1(emap) {
    let t = null;
    
    for (let r = 0; r <= array_length(emap) - 1; r = r + 1) {
        const a = emap[r];
        
        //l is the list containing all island pos of that row
        const l = accumulate(
            (x, y) => a[x] > 0 ? pair(pair(r, x), y) : y,
            null, 
            enum_list(0, array_length(emap[0]) - 1)); 
             
       
        t = append(l, t);
        
    }
    function is_member(pair, xs) {
        if (is_null(xs)) {
            return false;
        } else if (head(pair) === head(head(xs)) && tail(pair) === tail(head(xs))){
            return true;
            
        } else {
            return is_member(pair, tail(xs));
        }   
        
    }
    t = reverse(t);
    display(t);
    let count = 0;
    let a = null;
    for (let r = 0; r <= length(t) - 1; r = r + 1) {
        const is = list_ref(t, r);
        const thisr = head(is);
        const thisc = tail(is);
        if (thisr !== 0 && thisc !== 0) {
            if (!(is_member(pair(thisr - 1, thisc), t)) &&
            !(is_member(pair(thisr, thisc - 1), t))) {
               display(thisr, 'thisr');
                display(thisc, 'thisc');
                
                count = count + 1;
            } 
        } else if (thisr !== 0) {
            if (!(is_member(pair(thisr - 1, thisc), t))) {
               display(thisr, 'thisr');
                display(thisc, 'thisc');
                count = count + 1;
            }
        } else if (thisc !== 0 ){
            if (!(is_member(pair(thisr, thisc - 1), t))) {
                display(thisr, 'thisr');
                display(thisc, 'thisc');
                count = count + 1;
            }
        } else {
            count = count + 1;
        }
    }
    display(count);
    
    return count;
    

}

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
assert("3B_1", () => count_islands([[0]]), 0, []);
assert("3B_2", () => count_islands([[1]]), 1, []);
assert("3B_3", () => count_islands([[0,0], [0,0]]), 0, []);
assert("3B_4", () => count_islands([[2,1], [1,3]]), 1, []);
assert("3B_5", () => count_islands([[0,1], [0,0]]), 1, []);
assert("3B_6", () => count_islands([[2,0], [0,1]]), 2, []);
assert("3B_7", () => count_islands(emapB1), 6, []);
assert("3B_8", () => count_islands(emapB2), 5, []);


//===============================================================
