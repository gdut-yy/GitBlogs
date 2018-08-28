# 面试题 07：重建二叉树

题目：输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如，输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建如下所示的二叉树并输出它的头节点。二叉树结点的定义如下：

	struct BinaryTrerNode{
		int m_nValue;
		BinaryTreeNode* m_pLeft;
		BinaryTreeNode* m_pRight;
	}

	    1
	   / \
	  2   3
	 /    /\
	4    5  6
	 \     /
	  7   8

----

### 牛客网版本

	/**
	 * Definition for binary tree
	 * struct TreeNode {
	 *     int val;
	 *     TreeNode *left;
	 *     TreeNode *right;
	 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
	 * };
	 */
	class Solution {
	public:
	    TreeNode* reConstructBinaryTree(vector<int> pre,vector<int> vin) {
	        if(pre.empty() || vin.empty() || pre.size()!=vin.size())
	            return nullptr;
	
	        vector<int> left_pre, right_pre, left_vin, right_vin;
	        TreeNode *node = new TreeNode(pre[0]);
	
	        int left_length = 0;
	        while(pre[0]!=vin[left_length] && left_length < pre.size())
	            ++ left_length;
	
	        for(int i=0; i<left_length; i++)
	        {
	            left_pre.push_back(pre[i+1]);
	            left_vin.push_back(vin[i]);
	        }
	
	        for(int i=left_length+1; i<pre.size(); i++)
	        {
	            right_pre.push_back(pre[i]);
	            right_vin.push_back(vin[i]);
	        }
	        node->left = reConstructBinaryTree(left_pre, left_vin);
	        node->right = reConstructBinaryTree(right_pre, right_vin);
	
	        return node;
	    }
	};