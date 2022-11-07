
function solve(n, m) {
    
    if (n === 0 || m === 0) {
        return 0;
    }
    
    let amin = 0;
    let amax = 0;
    
    if (n < m) {
        amin = n;
        amax = m;
    } else {
        amin = m;
        amax = n;
    }
    
    const res = amax - amin + 1;
    return res + 2 * solve(amin - 1, amax);
    
}
solve(2,3);

function solve1(n, m) {
    
    if (n === 0 || m === 0) {
        return 0;
    }
    
    let amin = 0;
    let amax = 0;
    
    if (n < m) {
        amin = n;
        amax = m;
    } else {
        amin = m;
        amax = n;
    }
    
    const res = amax - amin + 1;
    return amin % 2 === 0 ?  res * 2 + 2 * solve(amin - 1, amax)
    : res + 2 * solve(amin - 1, amax);
    
}
solve1(2,3);

display_list(tokenize("uio jfds tokenize"));

//count total number of palindromic substrings

//cal(list(7,1,5,3,6,4));


//dia - must be square of 2n size

































