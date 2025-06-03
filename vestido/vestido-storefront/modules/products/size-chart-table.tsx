import {
  Table,
  TableBody,
  TableCell,
  //   TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';

type SizeChartMeta = {
  title: string;
  attributes: Record<string, { title: string }>;
};

type SizeChartData = {
  [key: string]: {
    in: string;
    cm: string;
  };
};

type SizeChartProps = {
  meta: SizeChartMeta;
  data: Record<string, SizeChartData>;
};
const SizeChartTable: React.FC<SizeChartProps> = ({ meta, data }) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-center text-black mb-3">
        {meta.title}
      </h2>
      <div className="mb-4 text-center text-gray-600 font-medium">
        In Inches
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Size</TableHead>
            {Object.values(meta.attributes).map((attribute, index) => (
              <TableHead key={index} className="text-center">
                {attribute.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.keys(data).map((size) => (
            <TableRow key={size}>
              <TableCell className="text-center text-xs font-medium">
                {size}
              </TableCell>
              {Object.keys(meta.attributes).map((attribute) => (
                <TableCell key={attribute} className="text-center">
                  {data[size][attribute]?.in || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 mb-4 text-center text-gray-600 font-medium">
        In Cm
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Size</TableHead>
            {Object.values(meta.attributes).map((attribute, index) => (
              <TableHead key={index} className="text-center">
                {attribute.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.keys(data).map((size) => (
            <TableRow key={size}>
              <TableCell className="text-center font-medium">{size}</TableCell>
              {Object.keys(meta.attributes).map((attribute) => (
                <TableCell key={attribute} className="text-center">
                  {data[size][attribute]?.cm || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SizeChartTable;
