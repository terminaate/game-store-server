export const testDto = (res: object, Dto: { new (model): object }) => {
	const resDto = new Dto(res);
	expect(Object.keys(res)).toEqual(Object.keys(resDto));
	expect(Object.values(res).map((o) => typeof o)).toEqual(
		Object.values(resDto).map((o) => typeof o)
	);
};
