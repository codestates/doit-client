const Card = () => `
  .ant-card {
    margin-bottom: 20px;
    border: 0;
    border-radius: 4px;
    box-shadow: 1px 1px 0 0 #d9d9d9;

    & .ant-card-head {
      background: #ffde5a;
      min-height: auto;
      border-radius: 4px 4px 0 0;

      & .ant-card-head-title {
        font-weight: 400;
        padding: 11px 0;
      }
    }
    
    & .ant-card-body {
      padding: 0;

      & > textarea {
        border: 0;
        padding: 4px 24px;
        border-radius: 0 0 4px 4px;

        background-attachment: local;
        background-image:
          linear-gradient(to right, white 20px, transparent 10px),
          linear-gradient(to left, white 20px, transparent 10px),
          repeating-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);
        line-height: 31px;
        
        &:disabled {
          color: #252525;
          background-image:
            linear-gradient(to right, #f5f5f5 20px, transparent 10px),
            linear-gradient(to left, #f5f5f5 20px, transparent 10px),
            repeating-linear-gradient(#f5f5f5, #f5f5f5 30px, #ccc 30px, #ccc 31px, gray 31px);
        }
      }
    }
  }
`;

export default Card;