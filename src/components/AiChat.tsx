import { Loader, SendIcon } from "lucide-react";
import { useUserContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function AiChat() {
  const {
    user,
    onSent,
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    result,
  } = useUserContext();


  const {work} = useParams();




  return (
    <div className="overflow-auto">
      <div className="m-4 vh-100 overflow-auto" style={{ scrollbarWidth: "none" }}>
        {/* Welcoming Message */}
        <p className="text-muted small fs-6">
          Welcome to our AI Chat! 🌟  
         
        </p>

        {/* First AI message */}
        <div className="d-flex p-4 mt-4" >
          <div className="d-flex gap-2" >
            <img
              src="/assets/icons/chat.svg"
              className="rounded-circle"
              style={{ height: "48px", width: "48px" }}
              alt="ai-logo"
            />
            <div
              className="border border-secondary rounded p-4 mt-4 bg-secondary text-white"
              style={{ maxWidth: "500px" }}
            >
             { work==="assistant"?(
              <>
               <span>I can help you with personalized recommendations, health care tips, and finding your skin type!  </span>
          <br />
          <b>Example to find skin routine:</b>  
          <p>
                "Hi! I need help with my skincare. My skin often feels [dry], and I also have occasional breakouts. Could you suggest some products I can use, a daily skincare routine I should follow, and any additional tips to improve my skin health?"
          </p>
          </>
             ):(
              <>
                <span>Hi there! you can find your skin type by using this prompt </span>
                <br />
                Hi [App Name]! My skin feels [describe oiliness/dryness, e.g., oily on the forehead and nose but dry on the cheeks]. It sometimes [describe sensitivity, e.g., gets sensitive when I use new products]. Can you analyze this and tell me my skin type and recommend suitable products?
              </>
             )}
          
            </div>
          </div>
        </div>

        {/* User reply */}
        {showResult && (
          <div className="d-flex flex-row-reverse rounded p-4 mt-4">
            <div className="d-flex flex-row-reverse gap-2">
              <img
                src={user.imageUrl || "/assets/images/profile.png"}
                className="rounded-circle"
                style={{ height: "48px", width: "48px" }}
                alt="avatar"
              />
              <div
                className="border border-secondary rounded p-4 mt-4 bg-secondary text-white"
                style={{ maxWidth: "500px" }}
              >
                {recentPrompt}
              </div>
            </div>
          </div>
        )}

        <div>
          {showResult && (
            <div className="d-flex p-4 mt-4">
              <div className="d-flex gap-2">
                <img
                  src="/assets/icons/chat.svg"
                  className="rounded-circle"
                  style={{ height: "48px", width: "48px" }}
                  alt="ai-logo"
                />
                {loading ? (
                  <Loader className="spinner-border text-primary" />
                ) : (
                  <>
                    <div
                      className="border border-secondary rounded p-4 mt-4 bg-secondary text-white"
                      style={{ maxWidth: "500px" }}
                      dangerouslySetInnerHTML={{ __html: result }}
                    ></div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="m-1 rounded bg-dark p-4 d-flex align-items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control bg-dark text-white border-0"
        />
        <button
          onClick={onSent}
          style={{ backgroundColor: "#9E99FE", color: "white" }}
          className="btn d-flex align-items-center gap-1"
        >
          <p className="d-none d-md-block mb-0">Send</p>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default AiChat;
