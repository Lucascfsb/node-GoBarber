import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default interface IMailTemplateProvider {
    parse(file: IParseMailTemplateDTO ): Promise<string>;
}
