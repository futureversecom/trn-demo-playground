import type { FC } from "react";
import JSONPretty from "react-json-pretty";
import JSONPrettyMonokai from "react-json-pretty/dist/monikai";

export const JSONViewer: FC<{ data: Record<string, unknown> }> = ({ data }) => {
	return <JSONPretty data={data} theme={JSONPrettyMonokai} themeClassName="!bg-transparent" />;
};
