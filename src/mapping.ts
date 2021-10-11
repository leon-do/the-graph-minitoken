import { BigInt } from "@graphprotocol/graph-ts"
import { MiniToken, Eminted } from "../generated/MiniToken/MiniToken"
import { MiniTokenEntity } from "../generated/schema"

export function handleEminted(event: Eminted): void {
  // Entities can be loaded from the store using a string ID; this ID
  let id = event.transaction.from.toHex() + "-" + event.params.EtokenId.toString()
  // needs to be unique across all entities of the same type
  let entity = MiniTokenEntity.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new MiniTokenEntity(id)
  }

  entity.Eowner = event.params.Eowner
  entity.EtokenId = event.params.EtokenId
  entity.ElastMint = event.params.ElastMint

  entity.save()
}
