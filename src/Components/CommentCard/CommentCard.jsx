import userPhoto from '../../assets/profile.png'

export default function CommentCard({ name, avatar, content, timestamp }) {

const commentCreatorPhoto = avatar.includes("undefined")? userPhoto : commentCreatorPhoto

    return (
        <>
            <div className="comment flex items-start gap-4 mt-4">
                <img src={commentCreatorPhoto} alt=""
                    className='size-12 rounded-full' />
                <div className="comment-body grow">
                    <div className="comment bg-gray-100 min-w-full shadow rounded-lg p-4">
                        <h4>{name}</h4>
                        <p className='text-gray-600'>{content}</p>
                    </div>
                    <div className="comment-actions flex items-center gap-4 text-sm text-gray-500 mt-2 ml-1">
                        <span className="comment-timestamp">{new Date(timestamp).toLocaleString()}</span>
                        <button className="like-comment-btn hover:underline cursor-pointer">Like</button>
                        <button className="reply-comment-btn hover:underline cursor-pointer">Reply</button>
                    </div>
                </div>
            </div>
        </>
    )
}
