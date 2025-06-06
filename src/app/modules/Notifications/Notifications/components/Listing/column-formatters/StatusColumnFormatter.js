import statusMocks from '../../../__mocks__/statusMocks';

function StatusColumnFormatter(cellContent) {
  const status = statusMocks.statusMock?.filter((e)=> e.id === Number(cellContent))[0]?.status
  return status
}

export default StatusColumnFormatter;


