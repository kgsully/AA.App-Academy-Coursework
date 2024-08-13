SELECT Insects.name, Trees.tree FROM InsectTrees
JOIN Insects ON (InsectTrees.insectId = Insects.id)
JOIN Trees ON (InsectTrees.treeId = Trees.id);
