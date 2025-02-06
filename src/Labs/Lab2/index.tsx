import "./index.css";
import BackgroundColor from "./backgroundcolors";
import Borders from "./borders";
import Padding from "./padding";
import Corners from "./corners";
import Dimensions from "./dimensions";
import Positions from "./positions";
import Zindex from "./zindex";
import Float from "./float";
import GridLayout from "./gridlayout";
import Flex from "./flex";
import ReactIconsSampler from "./reacticons";
import BootstrapGrids from "./bootstrapgrids";
import BootstrapForms from "./bootstrapforms";
import BootstrapLists from "./bootstraplists";
import BootstrapTables from "./bootstraptables";
import BootstrapNavigation from "./bootstrapnavigation";
import TOC from "./toc";
import { Container } from "react-bootstrap";

export default function Lab2() {
  return (
    <Container>
            <div id="wd-lab2">
        <h2>Lab 2 - Cascading Style Sheets</h2>
        <h3>Styling with the STYLE attribute</h3>
        <p style={{ backgroundColor: "blue",
                    color: "white" }}>
          Style attribute allows configuring look and feel
          right on the element. Although it's very convenient
          it is considered bad practice and you should avoid
          using the style attribute
        </p>
        <div id="wd-css-id-selectors">
          <h3>ID selectors</h3>
          <p id="wd-id-selector-1">
            Instead of changing the look and feel of all the 
            elements of the same name, e.g., P, we can refer to a specific element by its ID
          </p>
          <p id="wd-id-selector-2">
            Here's another paragraph using a different ID and a different look and
            feel
          </p>
          <h3>Class selectors</h3>
          <p className="wd-class-selector">
            Instead of using IDs to refer to elements, you can use an element's CLASS attribute
          </p>
          <h4 className="wd-class-selector">
            This heading has same style as paragraph above
          </h4>
        </div>
        <div id="wd-css-colors">
          <h2>Colors</h2>
          <h3 className="wd-fg-color-blue">Foreground color</h3>
          <p className="wd-fg-color-red">
            The text in this paragraph is red but
            <span className="wd-fg-color-green"> this text is green</span>
          </p>
        </div>
        <BackgroundColor />
        <Borders />
        <Padding />
        <Corners />
        <Dimensions/>
        <Positions/>
        <Zindex/>
        <Float/>
        <GridLayout/>
        <Flex/>
        <ReactIconsSampler/>
        <BootstrapGrids/>
        <BootstrapTables/>
        <BootstrapLists/>
        <BootstrapForms/>
        <BootstrapNavigation/>
        <TOC/>
      </div>
    </Container>
);}
