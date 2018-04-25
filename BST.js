/**
* ##Binary Search Tree
* 
* This uses updated-returns for add/delete of BST.
* The code is smaller for this approach.
*
* ******* 
* ###USAGE
* ```
* var tree = new BST();
* tree.add(value);
* tree.remove(value);
* tree.print();
* tree.min(); 
* tree.max(); 
* tree.find(value);
* tree.destroy();
* ```
*/
function BST() {
    
    this.root = undefined;

    this.clear = this.destroy = function() {
        this.root = undefined;
    };

    this.insert = this.add = function(val) {
        this.root = add(val, this.root);
    };

    this.delete = this.remove = function(val) {
        this.root = remove(val, this.root);
    };

    this.find = function(val) {
        return find(val, this.root);
    };

    this.min = function() {
        return findMin(this.root);
    };

    this.max = function() {
        return findMax(this.root);
    };

    /**
     * Prints the given tree as a text-pyramid
     * in console
     * @returns {String[][]}
     */
    this.print = function() {
        if(!this.root) return;
        var height, nodeList = [this.root], newList; 
        var strBuffer, gap, legends = []; // These variables are only need to generate a text-pyramid
        for(height = getHeight(this.root); height!=-1; height--) {
            newList = []; 
            strBuffer = fiboncciSpace(height);  // the initial gap
            gap = fiboncciSpace(height + 1);    // gap between nodes
            nodeList.forEach(function(node) {
                node = node || { value: " "};
                strBuffer = strBuffer
                    .concat(getChar(node))
                    .concat(gap);
                newList.push(node.left); newList.push(node.right);
            });
            strBuffer = strBuffer.trimRight();
            console.log(strBuffer);
            nodeList = newList;
        }

        // print the legends if any
        legends.forEach(function(legend) {
            console.log(legend.key, " = ", legend.value);
        });

        // this function was written to replace big numbers by
        // alternate legends so as the pyramid is not disturbed
        function getChar(node) {
            if((node.value + '').length > 1) {
                var key = String.fromCharCode(legends.length + 97);
                legends.push({
                    key: key,
                    value: node.value,
                });
                return key;
            } else {
                return node.value;
            }
        }

    };

    /**
     * Adds a given values appropriatly
     * under a given node and returns updated node
     * **********
     * **Note:** This uses update-on-return BST insert algorithm
     * **********
     * @param {any} val 
     * @param {Node} node 
     * @returns {Node}
     */
    function add(val, node) {
        if(!node) return new Node(val);
        var position = val < node.value ? 'left' : 'right';
        node[position] = add(val, node[position]);
        return node;
    }

    /**
     * Searches and removes a given values 
     * under the given node and returns updated node
     * **********
     * **Note:** This uses update-on-return BST remove algorithm
     * **********
     * @param {any} val 
     * @param {Node} node 
     * @returns {Node}
     */
    function remove(val, node) {
        if(!node) return null;
        if(val === node.value) {
            // both nodes exist
            if(node.left && node.right) {
                var minNode = findMin(node.right);
                node.value = minNode.value;
                node.right = remove(minNode.value, node.right);  // Since, we have copied the min node, remove it
                return node;

            }
            // only 1 or no nodes exist 
            else {
                return node.left ? node.left : node.right;
            }
        }
        var position = val < node.value ? 'left' : 'right';
        node[position] = remove(val, node[position]);
        return node;
    }

    /**
     * Find the lowest value node in a given tree
     * @param {Node} node 
     * @returns {Node}
     */
    function findMin(node) {
		return node.left ? findMin(node.left) : node;
	}

    /**
     * Find the highest value node in a given tree
     * @param {Node} node 
     * @returns {Node}
     */
	function findMax(node) {
		return node.right ? findMax(node.right) : node;
	}

    /**
     * Finds the node containing given value
     * @param {any} val 
     * @param {Node} node 
     * @returns {Node}
     */
	function find(val, node) {
		if(!node) return "Not Found";
		if(node.value == val) return node;
		return node.value > val ? find(val, node.left) : find(val, node.right);
	}

    /**
     * The base Node class. Used to construct a uni-directional node
     * @param {any} val 
     */
    function Node(val) {
        this.value = val;
        this.right = this.left = null;
    }

    /**
     * Recursively finds the height of a given node
     * @param {Node} node 
     * @returns {number}
     */
    function getHeight(node, height) {
        if(typeof height === "undefined") height = -1;
        if(!node) return height;
        return Math.max(getHeight(node.left, height+1), getHeight(node.right, height+1));
    }

    /**
     * generates spaces at power of 2.
     * Used while printing tree as text-pyramid
     * @param {number} level 
     * @returns {String}
     */
    function fiboncciSpace(level) {
        return Array(Math.pow(2, level)).join(" ");
    }
}
