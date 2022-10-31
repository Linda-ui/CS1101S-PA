// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 3A
////////////////////////////////////////////////////////////

function evaluate_BAE_tree(bae_tree) {
    if (is_number(bae_tree)) {
        return bae_tree;
    }

    const operator = head(tail(bae_tree));
    const left = evaluate_BAE_tree(head(bae_tree));
    const right = evaluate_BAE_tree(list_ref(bae_tree,2));
    
    return operator === '*'
           ? left * right
           : operator === '+'
           ? left + right 
           : operator === '-'
           ? left - right 
           : left / right;
    

}



////////////////////////////////////////////////////////////
// Question 3B
////////////////////////////////////////////////////////////

function build_BAE_tree(bae_list) {
    let s = null;
    
    function push(x) {
        s = pair(x, s);
        
    }
    
    function pop() {
        const temp = head(s);
        
        s = tail(s);
        return temp;
    }
    if (is_number(head(bae_list))) {
        return head(bae_list);
    }
    
    bae_list = tail(bae_list);
    
    
    while (!is_null(bae_list)) {
        const i = head(bae_list);
        
        bae_list = tail(bae_list);
        
        if (i === '(') {
            
        } else if (i === ')') {
            
            const c = pop();
            const b = pop();
            const a = pop();
            const newitem = list(a, b, c);
            push(newitem);
            
            
        } else {
            push(i);
            
        }
    }
    
    return head(s);
} 




////////////////////////////////////////////////////////////
// Question 3C
////////////////////////////////////////////////////////////

function evaluate_BAE(bae_list) {

    return evaluate_BAE_tree(build_BAE_tree(bae_list));

}



////////////////////////////////////////////////////////////
// Question 3D
////////////////////////////////////////////////////////////

function check_parentheses(paren_list) {

    let count = 0;
    const len = length(paren_list);
    for (let r = 0; r < len; r = r + 1) {
        const i = head(paren_list);
        paren_list = tail(paren_list);
        
        
        if (i === '(') {
            count = count + 1;
        } else {
            count = count - 1;
        }
        if (count < 0) {
            return false;
        }
        
    }
    return count === 0;
    
}



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


//===========================================================
// This function is provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===========================================================
function assert(f, test_name, fnames) {
    display(test_name + ": " + (f() ? "PASS" : "FAIL"));
}
//===========================================================



////////////////////////////////////////////////////////////
// Test Cases for Q3A
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_tree = 23;
        return equal(evaluate_BAE_tree(bae_tree), 23);
    },
    "Q3A-T1",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", 6);
        return equal(evaluate_BAE_tree(bae_tree), 30);
    },
    "Q3A-T2",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 50);
    },
    "Q3A-T3",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(8, "-", 2), "*", list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 60);
    },
    "Q3A-T4",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(20, "/", 2), "-", 2), "*",
                            list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 80);
    },
    "Q3A-T5",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = 100;
        return equal(evaluate_BAE_tree(bae_tree), 100);
    },
    "Q3A-T6",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(70, "-", 15);
        return equal(evaluate_BAE_tree(bae_tree), 55);
    },
    "Q3A-T7",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(7, "+", 5), "*", 3), "/",
                            list(list(20, "/", 2), "-", list(100, "-", 94)));
        return equal(evaluate_BAE_tree(bae_tree), 9);
    },
    "Q3A-T8",
    ['evaluate_BAE_tree']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3B
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_tree = 23;
        const bae_list = list(23);
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T1",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", 6);
        const bae_list = list("(", 5, "*", 6, ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T2",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", list(7, "+", 3));
        const bae_list = list("(", 5, "*", "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T3",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(8, "-", 2), "*", list(7, "+", 3));
        const bae_list = list("(", "(", 8, "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T4",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(20, "/", 2), "-", 2), "*",
                            list(7, "+", 3));
        const bae_list = list("(", "(", "(", 20, "/", 2, ")", "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T5",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = 100;
        const bae_list = list(100);
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T6",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(70, "-", 15);
        const bae_list = list("(", 70, "-", 15, ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T7",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(7, "+", 5), "*", 3), "/",
                            list(list(20, "/", 2), "-", list(100, "-", 94)));
        const bae_list = list("(", "(", "(", 7, "+", 5, ")", "*", 3, ")", "/",
                            "(", "(", 20, "/", 2, ")", "-",
                                 "(", 100, "-", 94, ")", ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T8",
    ['build_BAE_tree']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3C
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_list = list(23);
        return equal(evaluate_BAE(bae_list), 23);
    },
    "Q3C-T1",
    ['evaluate_BAE']
);

assert(
    () => {
        const bae_list = list("(", 5, "*", 6, ")");
        return equal(evaluate_BAE(bae_list), 30);
    },
    "Q3C-T2",
    ['evaluate_BAE']
);

assert(
    () => {
        const bae_list = list("(", "(", "(", 20, "/", 2, ")", "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(evaluate_BAE(bae_list), 80);
    },
    "Q3C-T3",
    ['evaluate_BAE']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3D
////////////////////////////////////////////////////////////

assert(
    () => {
        const paren_list = list();
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T1",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T2",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", "(", ")", ")",
                                   "(", "(", ")", "(", ")", ")", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T3",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list(")", "(");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T4",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", ")", ")", ")", "(", "(", ")");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T5",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", ")", "(");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T6",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", ")", "(", ")", "(", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T7",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", "(", ")", ")",
                                   "(", "(", ")", ")", ")", ")", ")");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T8",
    ['check_parentheses']
);
