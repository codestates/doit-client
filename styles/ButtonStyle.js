const ButtonStyle = () => `
  button.ant-btn {
    width: 100%;
    margin-bottom: 10px;

    color: #252525 !important;
    border-color: #999 !important;

    &:disabled {
      color: #d9d9d9 !important;  
      background: transparent !important;
      border-color: #d9d9d9 !important;
    }

    &.ant-btn-primary {
      background: #ffde5a;
    }

    &.ant-btn-danger {
      background: #f36c60;
    }
  }

  a.ant-btn {
    width: 100%;
  }
`;

export default ButtonStyle;