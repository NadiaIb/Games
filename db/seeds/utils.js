exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
	if (!created_at) return { ...otherProperties };
	return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
	return arr.reduce((ref, element) => {
		ref[element[key]] = element[value];
		return ref;
	}, {});
};

exports.formatComments = (comments, idLookup) => {
	return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
		const article_id = idLookup[belongs_to];
		return {
			article_id,
			author: created_by,
			...this.convertTimestampToDate(restOfComment),
		};
	});
};

exports.checkReviewIdExists = (review_id) => {
	return db
	.query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
	.then((result)=>{
		if (result.rows.length === 0 && review_id){
			return Promise.reject({status: 404, msg: "Review ID Not Found" })
		}
	})
}
