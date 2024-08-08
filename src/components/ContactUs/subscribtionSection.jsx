// todo remove

const SubscribtionSection = () => {

  return (
    <div className="subscribtionSection container flexColumnAlignCenter">
      <div className="stayConnect">To Stay Connected</div>
      <div className="subscribtionTitle">
        Subscribe to our newsletter to receive updates! 
      </div>
      <div className="inputButtonWrapper">
        <input placeholder="Enter Your Email" className="subscribtionInput" />
        <button className="subscribeBtn">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscribtionSection;
