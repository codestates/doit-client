
const ButtonStyle = () => `
  button.ant-btn {
    width: 100%;
    margin-bottom: 10px;

    border-color: #252525;
    color: #252525;

    &:hover, &:focus {
      color: #fff !important;
      background: #252525 !important;
      border-color: #252525 !important;
    }    

    &:disabled {
      color: #d9d9d9 !important;  
      background: transparent !important;
      border-color: #d9d9d9 !important;
    }

    &.ant-btn-primary {
      background: #F8D755;
    }

    &.ant-btn-danger {
      background: #D86056;
    }
  }

  a.ant-btn {
    width: 100%;
  }
`;

export default ButtonStyle;