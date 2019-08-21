
##### cli to scaffold projects


```bash
npm init @dkundel/project
# or
npx @dkundel/create-project
# or
npm install -g @dkundel/create-project
create-project
```

inspired by:
https://github.com/dkundel/create-project
https://www.twilio.com/blog/how-to-build-a-cli-with-node-js


cd ~/projects/node-redis    # go into the package directory
npm link                    # creates global link
cd ~/projects/node-bloggy   # go into some other package directory.
npm link redis              # link-install the package

see also:

https://medium.com/@ali.dev/how-to-publish-a-js-library-to-npm-with-rollup-typescript-8b51ede8f562

https://github.com/ReactTraining/history/blob/master/rollup.config.js





function randomName() {
	let string = btoa(Math.random())
			.toLowerCase()
			.replace(/[^a-z]+/g, ""),
		length = string.length / 2;
	return string.slice(0, length) + "-" + string.slice(length);
}

export function hashCustomElement(CustomElement) {
	let name = randomName();
	customElements.define(name, CustomElement);
	return (attributes, children) => {
		let div = document.createElement("div");
		div.innerHTML = `<${name} ${attributes || ""}>${children ||
			""}</${name}>`;
		document.body.appendChild(div);
		return div.firstChild;
	};
}

import { h } from "../../core";
import { Element, customElement, css } from "../";
import { hashCustomElement } from "./utils";

class CustomElement extends Element {
	static props = {
		fieldString: String,
		fieldNumber: Number,
		fieldBoolean: Boolean,
		fieldObject: Object,
		fieldArray: Array
	};
	render() {
		return (
			<host>
				<h1>hola</h1>
			</host>
		);
	}
}

let innerRootExample = hashCustomElement(CustomElement);

describe("element/tests/element", () => {
	it("Test field type string", async done => {
		let node = innerRootExample(`field-string="hello"`);

		await node.mounted;

		expect(node.fieldString).toBe("hello");

		done();
	});
	it("Test field type number", async done => {
		let node = innerRootExample(`field-number="100"`);

		await node.mounted;

		expect(node.fieldNumber).toBe(100);

		done();
	});
	it("Test field type boolean", async done => {
		let node = innerRootExample(`field-boolean`);

		await node.mounted;

		expect(node.fieldBoolean).toBe(true);

		done();
	});
	it("Test field type object", async done => {
		let node = innerRootExample(`field-object='{"field":true}'`);

		await node.mounted;

		expect(node.fieldObject).toEqual({ field: true });

		done();
	});

	it("Test field type array", async done => {
		let node = innerRootExample(`field-array='[]'`);

		await node.mounted;

		expect(node.innerHTML).toBe("<h1>hola</h1>");

		done();
	});

	it("Test customElement", async done => {
		function MyWc({ value }) {
			return <host>function {value}</host>;
		}

		MyWc.props = { value: Number };

		let innerElement = hashCustomElement(customElement(MyWc));

		let node = innerElement(`value="10"`);

		await node.mounted;

		expect(node.textContent).toBe("function 10");

		done();
	});
	it("Test shadowDom with styleSheet", async () => {
		let styleSheet = css`
			:host {
				display: flex;
				width: 100px;
				height: 100px;
			}
		`;

		function MyWc() {
			return <host shadowDom styleSheet={styleSheet} />;
		}
		let innerElement = hashCustomElement(customElement(MyWc));

		let node = innerElement();

		await node.mounted;

		let { display, width, height } = window.getComputedStyle(node);

		expect({ display, width, height }).toEqual({
			display: "flex",
			width: "100px",
			height: "100px"
		});
	});

	it("Test schema prop", async () => {
		function MyWc() {
			return <host />;
		}

		MyWc.props = {
			field: {
				type: Boolean,
				reflect: true,
				value: true
			}
		};

		let innerElement = hashCustomElement(customElement(MyWc));

		let node = innerElement();

		await node.mounted;

		expect(node.hasAttribute("field")).toBe(true);

		node.field = false;

		await node.process;

		expect(node.hasAttribute("field")).toBe(false);
	});
});