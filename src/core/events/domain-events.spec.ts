import { DomainEvent } from "../events/domain-event";
import { UniqueEntityID } from "../entities/unique-entity-id";
import { AggregateRoot } from "../entities/aggregate-root";
import { DomainEvents } from "@/core/events/domain-events";
import { vi } from "vitest";

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate; // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe("domain events", () => {
  it("should be able to dispatch and listen to events", async () => {
    const callbackSpy = vi.fn();

    // Subscriber (listen "answer create" event)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // Create answer without save in DB
    const aggregate = CustomAggregate.create();

    // Expect the event is create but not dispatch yet
    expect(aggregate.domainEvents).toHaveLength(1);

    // Save answer in DB and dispatch the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // Subscriber listen event and do what him have to do
    expect(callbackSpy).toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
