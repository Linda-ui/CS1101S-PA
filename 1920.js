//1A
function make_k_list(k ,d) {
    if (d === 0){
        return 0;
    } else {
        return build_list(x => make_k_list(k, d - 1), k);
    }
}

display_list(make_k_list(2,3));

//1B
function sum_k_list(klist) {
    if (is_list(klist)) {
        return accumulate(
            (x, y) => sum_k_list(x) + y, 0, klist);
    } else {
        return klist;
    }
}

//const klistB = list(list(0, 6, 3), list(8, 6, 10), list(5, 1, 25));
//sum_k_list(klistB); 

//1C
function map_k_list(f, klist) {
    if (is_list(head(klist))) {
        return accumulate(
            (x, y) => pair(map_k_list(f, x), y), null, klist);
    } else {
        return map(f, klist);
    }

}

const klistB = list(list(0, 6, 3), list(8, 6, 10), list(5, 1, 25));
map_k_list(x => 2 * x, klistB);


//2A
function route_distance(mat, route) {
    return accumulate((x, y) => mat[list_ref(route, x)][list_ref(route, x + 1)] + y,
    0, enum_list(0, length(route) - 2) );
}

//const mat = [[0, 1, 2, 3], [2, 0, 5, 6], [3, 3, 0, 4], [4, 4, 5, 0]];
//const route = list(2, 1, 3, 1);
//route_distance(mat, route);


//2B
function shortest_paper_route(n, mat, start) {
    //recursively find the shortest route
    function permutations(s) {
    return is_null(s) 
           ? list(null)
           : accumulate(append, null, map(x => map(p => pair(x, p), permutations(remove(x,s))),
             s));
}   
    const restlist = remove(start, enum_list(0, n - 1));
    const allroutes1 = permutations(restlist);
    const allroutes = map(x => append(append(list(start), x), list(start)), allroutes1);
    display_list(allroutes);
    
    function min(min1, rs, route) {
        if (is_null(rs)) {
            return pair(route, min1);
        } else {
            const dis = route_distance(mat, head(rs));
            if (dis < min1) {
                return min(dis, tail(rs), head(rs));
            }
            return min(min1, tail(rs), route);
        }
    }
    
    return min(100, allroutes, head(allroutes));
    
}

const mat = [[0, 1, 2, 3], [2, 0, 5, 6], [3, 3, 0, 4], [4, 4, 5, 0]];
const n = array_length(mat);
shortest_paper_route(n, mat, 1);
// returns pair(list(1, 0, 2, 3, 1), 12)




























