export const exportToCSV = (data: any, columns: any) => {
    const header = columns.map((col: any) => col.header);
    const rows = data.map((row: any) =>
        columns.map((col: any) => row[col.accessorKey] ?? '')
    );

    const csvContent = [
        header.join(','),
        ...rows.map((row: any[]) => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
};