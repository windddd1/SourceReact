import styled from "styled-components";
import Button from "@material-ui/core/Button";
const style = "margin-top:20px !important;"+
              "margin-left:90% !important;"+
              "border: 1px solid tomato !important;"+
              "color:tomato !important"
export default styled(Button)`
  width: ${ props => props.witdh };
  ${props => props.type === 'add' ? style : ''}
`;
