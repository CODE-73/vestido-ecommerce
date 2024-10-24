import {
  Table,
  TableBody,
  TableCaption,
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
      <Table>
        <TableCaption className="text-xl text-black mb-3">
          {meta.title}
        </TableCaption>
        <TableCaption className="mb-5">In Inches</TableCaption>
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
              <TableCell>{size}</TableCell>
              {Object.keys(meta.attributes).map((attribute) => (
                <TableCell key={attribute} className="text-center">
                  {data[size][attribute]?.in || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table>
        <TableCaption className="mb-5">In Cm</TableCaption>
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
              <TableCell>{size}</TableCell>
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
