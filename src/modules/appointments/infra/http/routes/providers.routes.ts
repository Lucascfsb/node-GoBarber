import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import ProvidersController from "../controllers/ProvidersController";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";

const providersRouter = Router();

const providersController = new ProvidersController()
const providersControllerMonthAvailability = new ProviderMonthAvailabilityController()
const providersControllerDayAvailability = new ProviderDayAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersController.index)
providersRouter.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required()
    }
  }),
  providersControllerMonthAvailability.index
)
providersRouter.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required()
  }
}),
 providersControllerDayAvailability.index
)

export default providersRouter;
